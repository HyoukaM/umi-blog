import React, { useContext } from 'react';
import InfoAboutMe from '@/components/card-info/InfoAboutMe';
import InfoCategory from '@/components/card-info/InfoCategory';
import LayoutContext from '@/context/layoutContext';
import { RenderBodyTypeStateEnum } from '@/models/renderType';
import InfoAnchor from '@/components/card-info/InfoAnchor';
import InfoLinks from '@/components/card-info/InfoLinks';
import cardInfo from '@/style/components/card-info.less';

const CardInfo = () => {
  const layoutContext = useContext(LayoutContext);
  const { type } = layoutContext;
  /**
   * 渲染锚点组件
   */
  const renderAnchorCom = () => {
    switch (type) {
      case RenderBodyTypeStateEnum.home:
        return <InfoCategory />;
      case RenderBodyTypeStateEnum.article:
        return <InfoAnchor />;
      default:
        return null;
    }
  };

  return (
    <>
      <InfoAboutMe />
      <div className={cardInfo.infoSticky}>
        {renderAnchorCom()}
        <InfoLinks />
      </div>
    </>
  );
};

export default CardInfo;
