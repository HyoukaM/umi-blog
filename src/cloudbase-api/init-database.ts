import cloudbase from '@cloudbase/js-sdk';

const cloudBase = cloudbase.init({
  env: 'hyouka-3gvi14m1c09e066d',
});

const db = cloudBase.database();

export default db;
