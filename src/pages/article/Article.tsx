import React, { useContext, useEffect, useState } from 'react';
import LayoutContext from '@/context/layoutContext';
import { useHistory, connect } from 'umi';
import MarkedRender from '@/components/markedRender/MarkedRender';
import { BlogInterface } from '@/cloudbase-api/blogInterface';
import query from '@/cloudbase-api/query';
import articleStyle from '@/style/pages/article.less';
import { BLOG_DATABASE, PUB_PATH } from '@/global/database';
import { command } from '@/cloudbase-api/init-database';
import { getQueryId } from '@/utils/reg';
import { ReducerFC } from '@/global/global';

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
      location: { search, pathname },
    } = history;
    let id;
    if (!search) {
      const [first] = blogs;
      const { _id } = first;
      id = _id;
      setActiveId(_id);
      history.push(`${pathname}?_id=${_id}`);
    } else {
      id = getQueryId(search);
    }
    setActiveId(id);
  };

  useEffect(() => {
    redirectPath();
  }, []);

  useEffect(() => {
    if (!activeId) {
      return;
    }
    query(BLOG_DATABASE, {
      _id: command.eq(activeId),
    }).then((res) => {
      if (!res.length) {
        history.push(PUB_PATH);
        return;
      }
      setArticle(res[0]);
    });
  }, [activeId]);

  useEffect(() => {
    dispatch({
      store: article?.content,
      type: 'blogs/effectContent',
    });
  }, [article]);

  if (!article) {
    return null;
  }

  return (
    <div className={articleStyle.article}>
      <MarkedRender context={article?.content} />
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
    </div>
  );
};

export default connect()(Article);
