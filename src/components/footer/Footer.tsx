import React from 'react';
import footerStyle from '@/style/components/footer.less';
import { linkInfo } from '@/global/links';

const Footer = () => {
  const hrefUrl = (url: string) => {
    window.open(url);
  };

  return (
    <div className={footerStyle.footer}>
      <div className={footerStyle.info}>
        <span>©{new Date().getFullYear()}</span>
        <span style={{ marginLeft: '10px' }}>Hyouka</span>
      </div>
      <div className={footerStyle.links}>
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

export default Footer;
