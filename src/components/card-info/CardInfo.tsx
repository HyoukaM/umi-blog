import React from 'react';
import cardInfo from '@/style/components/card-info.less';
import InfoAboutMe from '@/components/card-info/InfoAboutMe';
import InfoCategory from '@/components/card-info/InfoCategory';

const CardInfo = () => {
  return (
    <div className={cardInfo.cardInfo}>
      <InfoAboutMe />
      <InfoCategory />
    </div>
  );
};

export default CardInfo;
