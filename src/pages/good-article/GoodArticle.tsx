import React, { useContext, useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import { RenderBodyTypeStateEnum } from '@/models/renderType';
import CardItem from '@/components/card-item/CardItem';
import LayoutContext from '@/context/layoutContext';

const GoodArticle = () => {
  const [goodArticles, setGoodArticles] = useState<GoodArticleType[]>([]);
  const { articles } = useContext(LayoutContext);
  const getGoodArticles = () => {
    setGoodArticles(articles);
  };
  useEffect(() => {
    getGoodArticles();
  }, [articles]);
  return (
    <CardItem type={RenderBodyTypeStateEnum.goodArticle} maps={goodArticles} />
  );
};

export default GoodArticle;
