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
  export const getOneDb = async (id) => {
    console.log('GET from the database');
    const todosDb = await openDB('todos', 1);
    const tx = todosDb.transaction('todos', 'readonly');
    const store = tx.objectStore('todos');
    const request = store.get(id);
    const result = await request;
    console.log('result.value', result);
    return result;
    };

export const deleteDb = async (id) => {
  console.log('DELETE from the database', id);
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const request = store.delete(id);
  const result = await request;
  console.log('result.value', result);
  return result;
};

export const putDb = async (id, content) => {
  console.log('PUT to the database');
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('data saved to the database', result);
};

initdb();
