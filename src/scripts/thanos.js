import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const thanos = async () => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8'); //прочитали
    const arrayContacts = JSON.parse(contacts); //Перетворюємо JSON-рядок на масив об'єктів.
    const removingContacts = arrayContacts.filter(() => Math.random() >= 0.5); //Використовуємо метод filter, щоб залишити тільки ті контакти, для яких Math.random() повертає значення більше або рівне 0.5 (з 50% вірогідністю).
    await fs.writeFile(
      PATH_DB,
      JSON.stringify(removingContacts, null, 2),
      'utf-8',
    );
    console.log('Contacts after thanos:', removingContacts);
  } catch (error) {
    console.error('Error:', error);
  }
};

(async () => {
  await thanos();
})(); //Асинхронно викликаємо функцію thanos, щоб видалити частину контактів та перевірити роботу функції.
