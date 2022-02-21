import React, { useEffect } from 'react';
import Header from '@/components/header/Header';
import { connect, useHistory } from 'umi';
import { BlogModelState } from '@/models/blogModel';
import layoutStyle from '../style/layouts/layout.less';
import { ReducerFC } from '../../global';
import BodyContent from '@/components/body-content/BodyContent';
import LayoutContext from '@/context/layoutContext';
import '../style/index.less';

const Layouts: ReducerFC<{
  blogs: BlogModelState;
}> = (props) => {
  const { children, dispatch, blogs } = props;
  const history = useHistory();
  useEffect(() => {
    dispatch({
      type: 'blogs/getBlogs',
    });
  }, []);

  useEffect(() => {
    const bodyMove = document.querySelector('.body-move');
    if (bodyMove) {
      bodyMove?.setAttribute(
        'style',
        'transition: margin-top .8s ease-in-out; margin-top: -84px;',
      );
    }
  }, [history.location.pathname]);

  return (
    <div className={layoutStyle.layout}>
      <Header />
      <div className={layoutStyle.body}>
        <BodyContent />
        <div className={layoutStyle.childrenBody}>
          <LayoutContext.Provider value={{ blogs: blogs.blogs }}>
            {children}
          </LayoutContext.Provider>
        </div>
      </div>
    </div>
  );
};

// @ts-ignore
export default connect(({ blogs }: { blogs: BlogModelState }) => ({ blogs }))(
  Layouts,
);
