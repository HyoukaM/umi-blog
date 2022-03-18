import React, { useEffect, useState } from 'react';
import { GoodArticleType } from '@/cloudbase-api/blogInterface';
import { queryApi } from '@/cloudbase-api';
import CardItem from '@/components/card-item/CardItem';
import { RenderBodyTypeStateEnum } from '@/models/renderType';

const Links = () => {
  const [linksInfo, setLinksInfo] = useState<GoodArticleType[]>([]);
  const getLinksInfo = () => {
    try {
      queryApi<GoodArticleType[]>('links', {}).then((res) => {
        setLinksInfo(res);
      });
    } catch (e) {
      setLinksInfo([]);
    }
  };
  useEffect(() => {
    getLinksInfo();
  }, []);
  return <CardItem type={RenderBodyTypeStateEnum.links} maps={linksInfo} />;
};

export default Links;
