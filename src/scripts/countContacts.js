import { PATH_DB } from '../constants/contacts.js';
import fs from 'node:fs/promises';

export const countContacts = async () => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8'); //читаємо, отримуємо рядок, а не буффер
    const contactsArray = JSON.parse(contacts); //Перетворюємо прочитаний рядок JSON у масив об'єктів
    const counterContacts = contactsArray.length; //визначаємо довжину масииву
    return counterContacts;
  } catch (error) {
    console.error('Error counter:', error);
    return 0;
  }
};

(async () => {
  const numberOfContacts = await countContacts();
  console.log(`Number of contacts:, ${numberOfContacts}`);
})();
