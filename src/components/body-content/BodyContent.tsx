import React, { useEffect, useState } from 'react';
import bodyContentStyle from '../../style/components/body-content.less';
import { RenderBodyTypeStateEnum, RenderTypeState } from '@/models/renderType';
import { useHistory } from 'umi';
import query from '@/cloudbase-api/query';
import { BLOG_DATABASE } from '@/global/database';
import { command } from '@/cloudbase-api/init-database';
import { getQueryId } from '@/utils/reg';
import { BlogInterface } from '@/cloudbase-api/blogInterface';

interface BodyContentProps {
  type?: RenderTypeState;
}

const ArticleBodyContent = () => {
  const [currentArticle, setCurrentArticle] = useState<BlogInterface>();
  const history = useHistory();
  const {
    location: { search },
  } = history;
  useEffect(() => {
    query(BLOG_DATABASE, {
      _id: command.eq(getQueryId(search)),
    }).then((res) => {
      if (res.length) {
        setCurrentArticle(res[0]);
      }
    });
  }, []);

  if (!currentArticle) {
    return null;
  }
  const {
    portrait,
    author,
    title,
    contentCount,
    original,
    categories,
    describeIcon,
    createDate,
    updateDate,
  } = currentArticle;
  return (
    <div
      className={bodyContentStyle.articleContent}
      style={{
        backgroundImage: `url(${
          portrait ?? 'https://api.ixiaowai.cn/gqapi/gqapi.php'
        })`,
      }}
    >
      <div className={bodyContentStyle.articleContentInfo}>
        <div className={bodyContentStyle.firstInfo}>
          <span>{original ? '原创' : '转载'}</span>
          <span>
            <i className="fa fa-inbox" />
            <span>{categories ?? '无分类'}</span>
          </span>
        </div>
        <h1>{title}</h1>
        <div className={bodyContentStyle.lastInfo}>
          <span className={bodyContentStyle.lastInfoAuthor}>
            <img
              src={describeIcon ?? 'https://blog.zhheo.com/img/avatar.png'}
              alt={author}
            />
            <span>{author}</span>
          </span>
          <span className={bodyContentStyle.lastInfoCount}>
            <i className="fa fa-file-text" />
            <span>{contentCount ?? 0}</span>
          </span>
          <span>
            <i className="fa fa-calendar" />
            <span>{createDate}</span>
          </span>
          <span>
            <i className="fa fa-history" />
            <span>{updateDate}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const BodyContent: React.FC<BodyContentProps> = (props) => {
  const { type } = props;

  const renderAuthorContent = () => {
    if (!type) {
      return null;
    }
    const { type: renderType } = type;
    switch (renderType) {
      case RenderBodyTypeStateEnum.home:
        return null;
      case RenderBodyTypeStateEnum.goodArticle:
        return null;
      case RenderBodyTypeStateEnum.category:
        return null;
      case RenderBodyTypeStateEnum.links:
        return null;
      case RenderBodyTypeStateEnum.article:
        return <ArticleBodyContent />;
      default:
        return null;
    }
  };

  return renderAuthorContent();
};

export default BodyContent;
