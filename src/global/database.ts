const BLOG_DATABASE = 'blogs';
const CATEGORY = 'categories';
const GOOD_ARTICLE = 'goodArticle';
const LINKS = 'links';
const PUB_PATH = process.env.NODE_ENV === 'production' ? '/' : '/';
const PUB_CHILD_PATH = process.env.NODE_ENV === 'production' ? '' : '';

export {
  BLOG_DATABASE,
  PUB_PATH,
  PUB_CHILD_PATH,
  CATEGORY,
  GOOD_ARTICLE,
  LINKS,
};
