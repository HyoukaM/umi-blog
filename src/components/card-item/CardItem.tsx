import React from 'react';
import goodArticleStyle from '@/style/pages/goodArticle.less';
import { RenderBodyTypeStateEnum } from '@/models/renderType';
import { Card } from 'antd';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import Comment from '@/components/comment/Comment';

interface CardItem {
  type: string;
  maps: GoodArticleType[];
}

const CardItem: React.FC<CardItem> = (props) => {
  const { type, maps = [] } = props;
  return (
    <div className={goodArticleStyle.goodArticle}>
      <h1>
        {type === RenderBodyTypeStateEnum.goodArticle ? '好文推荐' : '友情链接'}
      </h1>
      <div className={goodArticleStyle.goodArticleCard}>
        {maps?.map((goodArticle) => {
          return (
            <Card
              key={goodArticle._id}
              className={goodArticleStyle.card}
              onClick={() => window.open(goodArticle.link_)}
            >
              {goodArticle.recommend && (
                <span className={goodArticleStyle.recommend}>推荐</span>
              )}
              <div
                style={{
                  backgroundImage: `url(${goodArticle.backgroundImage})`,
                }}
                className={goodArticleStyle.backgroundImage}
              />
              <div className={goodArticleStyle.title}>
                <div
                  style={{
                    backgroundImage: `url(${goodArticle.authorImage})`,
                  }}
                  className={goodArticleStyle.titleImage}
                />
                <div className={goodArticleStyle.titleContent}>
                  <span>{goodArticle.title || goodArticle.author}</span>
                  <span>{goodArticle.describe}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      <Comment />
    </div>
  );
};

export default CardItem;
