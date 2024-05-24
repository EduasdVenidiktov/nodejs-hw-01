import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const getAllContacts = async () => {
  try {
    const readArray = await fs.readFile(PATH_DB, 'utf8'); //додаємо параметр 'utf8' для того, щоб readFile повертав рядок, а не буфер.
    const contacts = JSON.parse(readArray); //Перетворюємо прочитаний рядок JSON у масив об'єктів
    return contacts;
  } catch (error) {
    console.error('Error reading array:', error);
    return []; //У разі виникнення помилки, функція повертає порожній масив, а не кидає помилку, щоб запобігти зупинці виконання.
  }
};

(async () => {
  const contacts = await getAllContacts();
  console.log(contacts);
})();
