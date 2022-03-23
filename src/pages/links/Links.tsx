import React, { useContext, useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import CardItem from '@/components/card-item/CardItem';
import { RenderBodyTypeStateEnum } from '@/models/renderType';
import LayoutContext from '@/context/layoutContext';

const Links = () => {
  const [linksInfo, setLinksInfo] = useState<GoodArticleType[]>([]);
  const { links } = useContext(LayoutContext);
  const getLinksInfo = () => {
    setLinksInfo(links);
  };
  useEffect(() => {
    getLinksInfo();
  }, [links]);
  return <CardItem type={RenderBodyTypeStateEnum.links} maps={linksInfo} />;
};

export default Links;
