import { BlogInterface } from '@/cloudbase-api/blogInterface';

const filterArticle = (blogs: BlogInterface[], activeId: string) => {
  if (blogs) {
    return Object.assign(blogs).filter(
      (blog: BlogInterface) => blog._id === activeId,
    )[0];
  }
  return null;
};

export { filterArticle };
