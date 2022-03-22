import { Effect, ImmerReducer } from 'umi';
import query from '@/cloudbase-api/query';
import { BlogInterface } from '@/cloudbase-api/blogInterface';

export interface BlogModelState {
  blogs: Array<BlogInterface>;
  currentContent: string;
}

export interface BlogModelType {
  namespace: 'blogs';
  state: BlogModelState;
  effects: {
    effectBlogs: Effect;
    effectContent: Effect;
  };
  reducers: {
    reducerBlogs: ImmerReducer<BlogModelState>;
    reducerContent: ImmerReducer<BlogModelState>;
  };
}

const blogModel: BlogModelType = {
  namespace: 'blogs',
  state: {
    blogs: [],
    currentContent: '',
  },
  effects: {
    *effectBlogs({ store }, { put, call }) {
      const result = yield call(query, 'blogs', {});
      yield put({
        type: 'reducerBlogs',
        store: result,
      });
    },
    *effectContent({ store }, { put }) {
      yield put({
        type: 'reducerContent',
        store,
      });
    },
  },
  reducers: {
    reducerBlogs(state, { store }) {
      return {
        ...state,
        blogs: store,
      };
    },
    reducerContent(state, { store }) {
      return {
        ...state,
        currentContent: store,
      };
    },
  },
};

export default blogModel;
