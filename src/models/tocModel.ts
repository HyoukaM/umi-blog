import { Effect, ImmerReducer } from '@@/plugin-dva/connect';

export interface TocState {
  toc?: {
    [key: string]: {
      level: number;
      id: string;
      title: string;
    };
  };
}

export interface TocType {
  namespace: 'toc';
  state: TocState;
  effects: {
    effectToc: Effect;
  };
  reducers: {
    reducerToc: ImmerReducer<TocState>;
  };
}

const tocModel: TocType = {
  namespace: 'toc',
  state: {
    toc: undefined,
  },
  effects: {
    *effectToc({ store }, { put }) {
      yield put({
        type: 'reducerToc',
        store,
      });
    },
  },
  reducers: {
    reducerToc(state, { store }) {
      return {
        toc: store,
      };
    },
  },
};

export default tocModel;
