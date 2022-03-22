import { createContext } from 'react';
import { BlogModelState } from '@/models/blogModel';
import { RenderBodyTypeStateEnum, RenderTypeState } from '@/models/renderType';

export default createContext<{
  blogs: BlogModelState['blogs'];
  type: RenderTypeState['type'];
}>({
  blogs: [],
  type: RenderBodyTypeStateEnum.home,
});
