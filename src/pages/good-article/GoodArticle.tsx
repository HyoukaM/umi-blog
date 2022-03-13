import React, { useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import goodArticleStyle from '@/style/pages/goodArticle.less';
import { queryApi } from '@/cloudbase-api';
import { Card } from 'antd';

const GoodArticle = () => {
  const [goodArticles, setGoodArticles] = useState<GoodArticleType[]>([]);
  const getGoodArticles = () => {
    queryApi<GoodArticleType[]>('goodArticle', {}).then((res) => {
      setGoodArticles(res);
    });
  };
  useEffect(() => {
    getGoodArticles();
  }, []);
  return (
    <div className={goodArticleStyle.goodArticle}>
      <div className={goodArticleStyle.goodArticleCard}>
        {goodArticles.map((goodArticle) => {
          return (
            <Card
              className={goodArticleStyle.card}
              onClick={() => window.open(goodArticle.link_)}
            >
              {goodArticle.recommend && (
                <span className={goodArticleStyle.recommend}>荐</span>
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
                    backgroundImage: `url(${goodArticle.backgroundImage})`,
                  }}
                  className={goodArticleStyle.titleImage}
                />
                <div className={goodArticleStyle.titleContent}>
                  <span>{goodArticle.title}</span>
                  <span>{goodArticle.describe}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GoodArticle;
