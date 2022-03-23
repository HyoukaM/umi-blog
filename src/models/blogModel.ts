import { Effect, ImmerReducer } from 'umi';
import query from '@/cloudbase-api/query';
import {
  BlogInterface,
  CategoryType,
  GoodArticleType,
} from '@/cloudbase-api/blogInterface';

export interface BlogModelState {
  blogs: Array<BlogInterface>;
  currentContent: string;
  categorys: CategoryType[];
  links: GoodArticleType[];
  articles: GoodArticleType[];
}

export interface BlogModelType {
  namespace: 'blogs';
  state: BlogModelState;
  effects: {
    effectBlogs: Effect;
    effectContent: Effect;
    effectCategory: Effect;
    effectLinks: Effect;
    effectGoodArticles: Effect;
  };
  reducers: {
    reducerBlogs: ImmerReducer<BlogModelState>;
    reducerContent: ImmerReducer<BlogModelState>;
    reducerCategory: ImmerReducer<BlogModelState>;
    reducerLinks: ImmerReducer<BlogModelState>;
    reducerGoodArticles: ImmerReducer<BlogModelState>;
  };
}

const blogModel: BlogModelType = {
  namespace: 'blogs',
  state: {
    blogs: [],
    currentContent: '',
    categorys: [],
    links: [],
    articles: [],
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
    *effectCategory({ store }, { put }) {
      yield put({
        type: 'reducerCategory',
        store,
      });
    },
    *effectGoodArticles({ store }, { put }) {
      yield put({
        type: 'reducerGoodArticles',
        store,
      });
    },
    *effectLinks({ store }, { put }) {
      yield put({
        type: 'reducerLinks',
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
    reducerCategory(state, { store }) {
      return {
        ...state,
        categorys: store,
      };
    },
    reducerGoodArticles(state, { store }) {
      return {
        ...state,
        articles: store,
      };
    },
    reducerLinks(state, { store }) {
      return {
        ...state,
        links: store,
      };
    },
  },
};

export default blogModel;
