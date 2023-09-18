import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => { const db = await openDB('jate', 1);
const tx = db.transaction('jate', 'readwrite');
await tx.store.put({ content });
await tx.done;
console.log('Data added to IndexedDB');
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const allRecords = await tx.store.getAll();
  await tx.done;
  
  if (allRecords.length > 0) {
    return allRecords[allRecords.length - 1].content;
  }
  
  console.error('No data in IndexedDB');
  return null;
};


initdb();
