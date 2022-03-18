import React from 'react';
import footerStyle from '@/style/components/footer.less';
import { linkInfo } from '@/global/links';
import logoIcon from '@/assets/favicon.svg';

const AboutMe = () => {
  const hrefUrl = (url: string) => {
    window.open(url);
  };

  return (
    <div className={footerStyle.footer}>
      {linkInfo.map((link) => {
        return (
          <span key={link.key} className={footerStyle.link}>
            {link.goHome ? (
              <img src={logoIcon} alt="主页" title={link.key} />
            ) : (
              <i
                className={link.icon}
                onClick={() => hrefUrl(link.url)}
                style={{
                  fontSize: link.fontSize,
                }}
                title={link.key}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default AboutMe;
