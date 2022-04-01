import db from '@/cloudbase-api/init-database';
import type { BlogResponse } from '@/cloudbase-api/blogInterface';

export default <T = BlogResponse>(
  database: string,
  id: string,
  updateData: object,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      db.collection(database)
        .where({
          _id: id,
        })
        .update(updateData)
        .then((response) => {
          resolve(response as unknown as T);
        });
    } catch (e) {
      reject(e);
    }
  });
};
