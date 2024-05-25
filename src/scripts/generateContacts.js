import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';
import fs from 'fs/promises';

const generateContacts = async (number) => {
  try {
    // Читаємо поточний вміст файлу
    let fileContent;
    try {
      fileContent = await fs.readFile(PATH_DB, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        // Якщо файл не існує, створюємо порожній масив
        fileContent = '[]';
      } else {
        throw err;
      }
    }

    const contacts = JSON.parse(fileContent); //Перетворюємо прочитаний рядок JSON у масив об'єктів

    // Генеруємо нові контакти і додаємо їх до масиву
    const newContacts = [...Array(number)].map(createFakeContact);
    contacts.push(...newContacts);

    // Записуємо оновлений масив назад у файл
    await fs.writeFile(PATH_DB, JSON.stringify(contacts, null, 2), 'utf-8');
    console.log('Дані успішно додані до файлу.');
  } catch (err) {
    console.error('Помилка додавання даних до файлу:', err);
  }
};

await generateContacts(5);
