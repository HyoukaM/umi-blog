import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/header/Header';
import { connect, useHistory } from 'umi';
import { BlogModelState } from '@/models/blogModel';
import layoutStyle from '../style/layouts/layout.less';
import { ReducerFC } from '@/global/global';
import BodyContent from '@/components/body-content/BodyContent';
import LayoutContext from '@/context/layoutContext';
import AboutMe from '@/components/footer/AboutMe';
import { moveBody, scrollTop } from '@/utils/elementUtils';
import CardInfo from '@/components/card-info/CardInfo';
import { RenderBodyTypeStateEnum, RenderTypeState } from '@/models/renderType';
import '../style/index.less';
import FooterBar from '@/components/footer/FooterBar';
import query from '@/cloudbase-api/query';
import { CATEGORY, GOOD_ARTICLE, LINKS, REPLY } from '@/global/database';
import { recursion } from '@/utils';
import { Reply } from '@/cloudbase-api/blogInterface';
import db from '@/cloudbase-api/init-database';

const Index: ReducerFC<{
  blogs: BlogModelState;
  render: RenderTypeState;
}> = (props) => {
  const { children, dispatch, blogs, render } = props;
  const { type } = render;
  const [renderCardInfo, setRenderCardInfo] = useState<boolean>(true);
  const history = useHistory();
  const pathnameReg = /^\/(\w*)/g;
  /**
   * 更改当前的渲染类型
   */
  const dispatchType = () => {
    dispatch({
      type: 'render/effectType',
      store: pathnameReg.exec(history.location.pathname)?.['1'],
    });
  };
  /**
   * dispatch
   */
  const effectDispatch = () => {
    dispatch({
      type: 'blogs/effectBlogs',
    });
    query(CATEGORY, {}).then((res) => {
      dispatch({
        type: 'blogs/effectCategory',
        store: res,
      });
    });
    query(GOOD_ARTICLE, {}).then((res) => {
      dispatch({
        type: 'blogs/effectGoodArticles',
        store: res,
      });
    });
    query(LINKS, {}).then((res) => {
      dispatch({
        type: 'blogs/effectLinks',
        store: res,
      });
    });
  };

  const effectReply = (reply?: Reply[]) => {
    if (reply && reply.length) {
      dispatch({
        type: 'blogs/effectReply',
        store: reply,
      });
      return;
    }
  };

  useEffect(() => {
    scrollTop();
    dispatchType();
  }, [history.location.pathname]);

  useEffect(() => {
    effectDispatch();
    const watcher = db.collection(REPLY).watch({
      onChange(res) {
        const { docs } = res;
        effectReply(docs as Reply[]);
      },
      onError() {},
    });
    return () => {
      watcher.close();
    };
  }, []);

  useEffect(() => {
    if (
      type === RenderBodyTypeStateEnum.goodArticle ||
      type === RenderBodyTypeStateEnum.links
    ) {
      setRenderCardInfo(false);
    }
    if (
      type === RenderBodyTypeStateEnum.home ||
      type === RenderBodyTypeStateEnum.article ||
      type === RenderBodyTypeStateEnum.category
    ) {
      setRenderCardInfo(true);
    }
  }, [type]);

  return (
    <>
      <LayoutContext.Provider
        value={{
          blogs: blogs.blogs,
          type,
          categorys: blogs.categorys,
          articles: blogs.articles,
          links: blogs.links,
        }}
      >
        <div className={layoutStyle.layout}>
          <Header />
          <div
            style={{
              marginTop: type === 'article' ? '0' : '60px',
            }}
            className={layoutStyle.body}
          >
            <BodyContent type={render} />
            <div className={`${layoutStyle.childrenBody}`}>
              <div
                style={{
                  width: renderCardInfo ? '75%' : '100%',
                }}
                className={layoutStyle.content}
              >
                {children}
              </div>
              {renderCardInfo && (
                <div className={layoutStyle.asideContent}>
                  <CardInfo />
                </div>
              )}
            </div>
            <div className={layoutStyle.footer}>
              <AboutMe />
              <FooterBar />
            </div>
          </div>
        </div>
      </LayoutContext.Provider>
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
