import React, { useEffect, useState } from 'react';
import footerStyle from '@/style/components/footer.less';

const FooterBar = () => {
  const [title, setTitle] = useState<string>('');

  const fetchSubtitle = () => {
    fetch('https://v1.hitokoto.cn/')
      .then((response) => response.json())
      .then(async (data) => {
        await setTitle(data.hitokoto);
      });
  };

  useEffect(() => {
    fetchSubtitle();
  }, []);
  return (
    <div className={footerStyle.footerBar}>
      <div className={footerStyle.footerTitle}>{title}</div>
      <div className={footerStyle.footerInfo}>
        <span>关于</span>
      </div>
    </div>
  );
};

export default FooterBar;
