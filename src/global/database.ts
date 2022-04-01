/**
 * 文章
 */
const BLOG_DATABASE = 'blogs';
/**
 * 分类
 */
const CATEGORY = 'categories';
/**
 * 好文推荐
 */
const GOOD_ARTICLE = 'goodArticle';
/**
 * 友情链接
 */
const LINKS = 'links';
/**
 * 评论
 */
const REPLY = 'reply';
const PUB_PATH = process.env.NODE_ENV === 'production' ? '/' : '/';
const PUB_CHILD_PATH = process.env.NODE_ENV === 'production' ? '' : '';

export {
  BLOG_DATABASE,
  PUB_PATH,
  PUB_CHILD_PATH,
  CATEGORY,
  GOOD_ARTICLE,
  LINKS,
  REPLY,
};
