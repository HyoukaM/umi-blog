import db from '@/cloudbase-api/init-database';

export default (database: string, value: object) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(db.collection(database).add(value));
    } catch (e) {
      reject(e);
    }
  });
};
