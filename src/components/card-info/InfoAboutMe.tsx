import React from 'react';
import cardInfo from '@/style/components/card-info.less';
import moment from 'moment';

const InfoAboutMe = () => {
  const currentTime = () => {
    const hour = moment().hour();
    if (hour >= 0 && hour < 6) {
      return '凌晨';
    }
    if (hour >= 6 && hour < 12) {
      return '上午';
    }
    if (hour >= 12 && hour < 18) {
      return '下午';
    }
  };
  return (
    <div className={cardInfo.infoAboutMe}>
      <div className={cardInfo.hello}>👋👋{currentTime()}好！我是</div>
      <div className={cardInfo.author}>诸观涛</div>
      <div className={cardInfo.info}>
        这有关于<b>前端、算法、后端</b>相关的问题和看法，还有摸鱼滚打和分享。
      </div>
      <div className={cardInfo.info}>
        <span className={cardInfo.margin}>
          相信你可以在这里找到对你有用的<b>知识</b>和<b>教程</b>。
        </span>
      </div>
      <div className={cardInfo.links}>
        <span onClick={() => window.open('https://github.com/HyoukaM')}>
          <i className="iconfont icon-github" />
        </span>
      </div>
    </div>
  );
};

export default InfoAboutMe;
