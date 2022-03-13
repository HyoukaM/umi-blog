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

const BodyContent: React.FC<BodyContentProps> = (props) => {
  const { type } = props;
  const [title, setTitle] = useState<string>('');
  const [currentArticle, setCurrentArticle] = useState<BlogInterface>();
  const history = useHistory();

  const fetchSubtitle = () => {
    fetch('https://v1.hitokoto.cn/')
      .then((response) => response.json())
      .then(async (data) => {
        await setTitle(data.hitokoto);
      });
  };

  const renderAuthorContent = () => {
    if (!type) {
      return null;
    }
    const { type: renderType } = type;
    switch (renderType) {
      case RenderBodyTypeStateEnum.home:
        return homeBodyContent();
      case RenderBodyTypeStateEnum.archive:
        return null;
      case RenderBodyTypeStateEnum.article:
        return articleBodyContent();
      default:
        return homeBodyContent();
    }
  };

  const articleBodyContent = () => {
    const {
      location: { search },
    } = history;
    query(BLOG_DATABASE, {
      _id: command.eq(getQueryId(search)),
    }).then((res) => {
      if (res.length) {
        setCurrentArticle(res[0]);
      }
    });
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
  /**
   * 首页渲染
   */
  const homeBodyContent = () => {
    return (
      <div className={bodyContentStyle.bodyContent}>
        <div className={bodyContentStyle.content}>
          <span className={bodyContentStyle.describe}>{title}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchSubtitle();
  }, []);

  return renderAuthorContent();
};

export default BodyContent;
