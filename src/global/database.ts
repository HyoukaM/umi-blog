const BLOG_DATABASE = 'blogs';
const PUB_PATH = process.env.NODE_ENV === 'production' ? '/app' : '/';
const PUB_CHILD_PATH = process.env.NODE_ENV === 'production' ? '/app' : '';

export { BLOG_DATABASE, PUB_PATH, PUB_CHILD_PATH };
