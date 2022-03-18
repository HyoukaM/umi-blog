import db from '@/cloudbase-api/init-database';
import { BlogResponse } from '@/cloudbase-api/blogInterface';

export default <T = BlogResponse>(
  database: string,
  query: object,
  field?: string,
  orderType?: string,
): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      db.collection(database)
        .where(query)
        .orderBy((field = 'createDate'), (orderType = 'desc'))
        .get()
        .then((response) => {
          resolve(response.data as unknown as T);
        });
    } catch (e) {
      reject(e);
    }
  });
};
