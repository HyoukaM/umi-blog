import { createContext } from 'react';
import { BlogModelState } from '@/models/blogModel';
import { RenderBodyTypeStateEnum, RenderTypeState } from '@/models/renderType';

export default createContext<{
  blogs: BlogModelState['blogs'];
  type: RenderTypeState['type'];
  categorys: BlogModelState['categorys'];
  articles: BlogModelState['articles'];
  links: BlogModelState['links'];
}>({
  blogs: [],
  type: RenderBodyTypeStateEnum.home,
  categorys: [],
  articles: [],
  links: [],
});
