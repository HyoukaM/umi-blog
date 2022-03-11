import { Effect, ImmerReducer } from '@@/plugin-dva/connect';

export enum RenderBodyTypeStateEnum {
  home = '',
  archive = 'archive',
  article = 'article',
  goodArticle = 'good-article',
}

export interface RenderTypeState {
  type: RenderBodyTypeStateEnum;
}

export interface RenderBodyType {
  namespace: 'render';
  state: RenderTypeState;
  effects: {
    effectType: Effect;
  };
  reducers: {
    reducerType: ImmerReducer<RenderTypeState>;
  };
}

const renderTypeModel: RenderBodyType = {
  namespace: 'render',
  state: {
    type: RenderBodyTypeStateEnum.home,
  },
  effects: {
    *effectType({ store }, { put }) {
      yield put({
        type: 'reducerType',
        store,
      });
    },
  },
  reducers: {
    reducerType(state, { store }) {
      return {
        type: store,
      };
    },
  },
};

export default renderTypeModel;
