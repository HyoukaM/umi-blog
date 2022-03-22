import React from 'react';
import cardInfo from '@/style/components/card-info.less';

const InfoLinks = () => {
  return (
    <div className={cardInfo.infoLinks}>
      <a href="#links">
        <img
          src="https://github-do.panbaidu.cn//https://raw.githubusercontent.com/zhheo/Guli/main/others/frindlink.png"
          alt="链接"
        />
      </a>
    </div>
  );
};

export default InfoLinks;
