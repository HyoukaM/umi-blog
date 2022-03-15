import React, { useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import goodArticleStyle from '@/style/pages/goodArticle.less';
import { queryApi } from '@/cloudbase-api';
import { Card } from 'antd';
import { connect } from 'umi';
import { RenderBodyTypeStateEnum, RenderTypeState } from '@/models/renderType';
import { ReducerFC } from '@/global/global';

const GoodArticle: ReducerFC<{
  render: RenderTypeState;
}> = (props) => {
  const [goodArticles, setGoodArticles] = useState<GoodArticleType[]>([]);
  const { render } = props;
  const { type } = render;
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
      <h1>
        {type === RenderBodyTypeStateEnum.goodArticle ? '好文推荐' : '友情链接'}
      </h1>
      <div className={goodArticleStyle.goodArticleCard}>
        {goodArticles.map((goodArticle) => {
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

export default connect(({ render }: { render: RenderTypeState }) => ({
  render,
}))(GoodArticle);
