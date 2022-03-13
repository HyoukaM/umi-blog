import React, { useEffect, useRef } from 'react';
import Header from '@/components/header/Header';
import { connect, useHistory } from 'umi';
import { BlogModelState } from '@/models/blogModel';
import layoutStyle from '../style/layouts/layout.less';
import { ReducerFC } from '@/global/global';
import BodyContent from '@/components/body-content/BodyContent';
import LayoutContext from '@/context/layoutContext';
import Footer from '@/components/footer/Footer';
import { moveBody, scrollTop } from '@/utils/elementUtils';
import CardInfo from '@/components/card-info/CardInfo';
import { RenderTypeState } from '@/models/renderType';
import '../style/index.less';

const Index: ReducerFC<{
  blogs: BlogModelState;
  render: RenderTypeState;
}> = (props) => {
  const { children, dispatch, blogs, render } = props;
  const { type } = render;
  const moveBodyCurrent = useRef<HTMLDivElement | null>();
  const history = useHistory();
  /**
   * 更改当前的渲染类型
   */
  const dispatchType = () => {
    dispatch({
      type: 'render/effectType',
      store: history.location.pathname.replace('/', ''),
    });
  };

  useEffect(() => {
    moveBodyCurrent.current?.removeAttribute('style');
    moveBody('.body-move');
    scrollTop();
    dispatchType();
  }, [history.location.pathname]);

  useEffect(() => {
    dispatch({
      type: 'blogs/getBlogs',
    });
  }, []);

  return (
    <>
      <div className={layoutStyle.layout}>
        <Header />
        <div
          style={{
            marginTop: type === 'article' ? '0' : '60px',
          }}
          className={layoutStyle.body}
        >
          <BodyContent type={render} />
          <div
            ref={(ref) => (moveBodyCurrent.current = ref)}
            className={`${layoutStyle.childrenBody}`}
          >
            <LayoutContext.Provider value={{ blogs: blogs.blogs }}>
              <div className={layoutStyle.content}>{children}</div>
              <div className={layoutStyle.asideContent}>
                <CardInfo />
              </div>
            </LayoutContext.Provider>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

// @ts-ignore
export default connect(
  ({ blogs, render }: { blogs: BlogModelState; render: RenderTypeState }) => ({
    blogs,
    render,
  }),
)(Index);
