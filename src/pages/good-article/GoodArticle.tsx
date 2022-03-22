import React, { useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import { queryApi } from '@/cloudbase-api';
import { RenderBodyTypeStateEnum } from '@/models/renderType';
import CardItem from '@/components/card-item/CardItem';
import { GOOD_ARTICLE } from '@/global/database';

const GoodArticle = () => {
  const [goodArticles, setGoodArticles] = useState<GoodArticleType[]>([]);
  const getGoodArticles = () => {
    try {
      queryApi<GoodArticleType[]>(GOOD_ARTICLE, {}).then((res) => {
        setGoodArticles(res);
      });
    } catch (e) {
      setGoodArticles([]);
    }
  };
  useEffect(() => {
    getGoodArticles();
  }, []);
  return (
    <CardItem type={RenderBodyTypeStateEnum.goodArticle} maps={goodArticles} />
  );
};

export default GoodArticle;
