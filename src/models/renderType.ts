import { Effect, ImmerReducer } from '@@/plugin-dva/connect';

export enum RenderBodyTypeStateEnum {
  /**
   * 首页
   */
  home = '',
  /**
   * 文章
   */
  article = 'article',
  /**
   * 好文推荐
   */
  goodArticle = 'good',
  /**
   * 分类
   */
  category = 'category',
  /**
   * 友情链接
   */
  links = 'links',
}

export interface RenderTypeState {
  type?: RenderBodyTypeStateEnum;
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
    type: undefined,
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
