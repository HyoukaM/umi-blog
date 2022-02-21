import { createContext } from 'react';
import { BlogModelState } from '@/models/blogModel';

export default createContext<{ blogs: BlogModelState['blogs'] }>({
  blogs: [],
});
