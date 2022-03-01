import React from 'react';
import cardInfo from '@/style/components/card-info.less';
import avatarNode from '@/assets/logo.png';
import { linkInfo } from '@/global/links';
import footerStyle from '@/style/components/footer.less';

const CardInfo = () => {
  const hrefUrl = (url: string) => {
    window.open(url);
  };
  return (
    <div className={cardInfo.cardInfo}>
      <div className={cardInfo.cardInfoAvatar}>
        <img className={cardInfo.avatarImage} src={avatarNode} alt="图标" />
        <div className={cardInfo.name}>Hyouka</div>
        <div className={cardInfo.description}>前端小菜鸟的博客</div>
      </div>
      <div className={cardInfo.data}>
        <div className={cardInfo.item}>
          <span>文章</span>
          <span>18</span>
        </div>
        <div className={cardInfo.item}>
          <span>文章</span>
          <span>18</span>
        </div>
        <div className={cardInfo.item}>
          <span>文章</span>
          <span>18</span>
        </div>
      </div>
      <div
        className={cardInfo.linkInfo}
        onClick={() => window.open('https://github.com/HyoukaM')}
      >
        <i className="fa fa-github" />
        关注我
      </div>
      <div>
        {linkInfo.map((link) => {
          return (
            <span key={link.key} className={footerStyle.link}>
              <img
                src={link.icon}
                alt={link.key}
                onClick={() => hrefUrl(link.url)}
              />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default CardInfo;
