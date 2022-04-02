import React, { useContext, useEffect, useState } from 'react';
import LayoutContext from '@/context/layoutContext';
import { useHistory, connect } from 'umi';
import MarkedRender from '@/components/markedRender/MarkedRender';
import { BlogInterface } from '@/cloudbase-api/blogInterface';
import articleStyle from '@/style/pages/article.less';
import { getQueryId } from '@/utils/reg';
import { ReducerFC } from '@/global/global';
import { filterArticle } from '@/utils';
import Pagination from '@/components/pagination/Pagination';
import { scrollTop } from '@/utils/elementUtils';

const Article: ReducerFC = (props) => {
  const { dispatch } = props;
  const history = useHistory();
  const { blogs } = useContext(LayoutContext);
  const [activeId, setActiveId] = useState<string>('');
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [article, setArticle] = useState<BlogInterface>();
  /**
   * 重定向路由
   */
  const redirectPath = () => {
    const {
      location: { search },
    } = history;
    setActiveId(getQueryId(search));
  };

  useEffect(() => {
    redirectPath();
    scrollTop();
  }, [history.location.pathname, history.location.search]);

  useEffect(() => {
    if (!activeId) {
      return;
    }
    if (filterArticle(blogs, activeId)) {
      setArticle(filterArticle(blogs, activeId) as BlogInterface);
    }
  }, [activeId, blogs]);

  useEffect(() => {
    dispatch({
      store: article?.content,
      type: 'blogs/effectContent',
    });
  }, [article]);

  useEffect(() => {
    return () => {
      dispatch({
        store: '',
        type: 'blogs/effectContent',
      });
    };
  }, []);

  if (!article) {
    return null;
  }

  const onPaginationChange = (data: BlogInterface | undefined) => {
    if (data) {
      const { _id } = data;
      if (_id) {
        history.push(`/article?_id=${_id}`);
      }
    }
  };
  return (
    <div className={articleStyle.article}>
      <MarkedRender context={article?.content} dispatch={dispatch} />
      <div className={articleStyle.footer}>
        <div className={articleStyle.footerTitle}>
          <span className={articleStyle.original}>
            {article.original ? '原创' : '转载'}
          </span>
          <span>{article.title}</span>
        </div>
        <div className={articleStyle.href}>
          <a href={window.location.href}>{`${window.location.href}`}</a>
        </div>
        <div className={articleStyle.author}>
          本文是{article.original ? '原创' : '转载'}文章，采用 CC BY-NC-ND 4.0
          协议，完整转载请注明来自 {article.author}
        </div>
      </div>
      <Pagination
        dataSource={blogs}
        value={activeId}
        onPageChange={onPaginationChange}
      />
    </div>
  );
};

export default connect()(Article);
