import db from '@/cloudbase-api/init-database';

export default (database: string, query: object) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(db.collection(database).where(query).get());
    } catch (e) {
      reject(e);
    }
  });
};
