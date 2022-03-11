import { Effect, ImmerReducer } from 'umi';
import query from '@/cloudbase-api/query';
import { BlogInterface } from '@/cloudbase-api/blogInterface';

export interface BlogModelState {
  blogs: Array<BlogInterface>;
}

export interface BlogModelType {
  namespace: 'blogs';
  state: BlogModelState;
  effects: {
    getBlogs: Effect;
  };
  reducers: {
    saveBlogs: ImmerReducer<BlogModelState>;
  };
}

const blogModel: BlogModelType = {
  namespace: 'blogs',
  state: {
    blogs: [],
  },
  effects: {
    *getBlogs({ store }, { put, call }) {
      const result = yield call(query, 'blogs', {});
      yield put({
        type: 'saveBlogs',
        store: result,
      });
    },
  },
  reducers: {
    saveBlogs(state, { store }) {
      return {
        ...state,
        blogs: store,
      };
    },
  },
};

export default blogModel;
