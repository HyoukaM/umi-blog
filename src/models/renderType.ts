import { Effect, ImmerReducer } from '@@/plugin-dva/connect';

export enum RenderBodyTypeStateEnum {
  home = '',
  default = 'default',
  article = 'article',
}

export interface RenderTypeState {
  type: keyof typeof RenderBodyTypeStateEnum;
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
    type: RenderBodyTypeStateEnum.default,
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
