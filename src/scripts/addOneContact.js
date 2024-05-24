import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'fs/promises';

export const addOneContact = async () => {
  try {
    // Читаємо поточний вміст файлу
    let fileContent;
    try {
      fileContent = await fs.readFile(PATH_DB, 'utf8');
      // Перевіряємо чи вміст файлу не порожній і є правильним JSON
      fileContent = fileContent.trim();
      if (fileContent === '') {
        fileContent = '[]';
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Якщо файл не існує, створюємо порожній масив
        fileContent = '[]';
      } else {
        throw err;
      }
    }

    const contacts = JSON.parse(fileContent);

    // Генеруємо новий контакт і додаємо його до масиву
    const newContact = createFakeContact();
    contacts.push(newContact);

    // Записуємо оновлений масив назад у файл
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf8');
    console.log('Дані успішно додані до файлу.');
  } catch (err) {
    console.error('Помилка додавання даних до файлу:', err);
  }
};

await addOneContact();
