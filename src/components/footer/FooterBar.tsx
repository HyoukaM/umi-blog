import React, { useEffect, useRef, useState } from 'react';
import EasyTyper from 'easy-typer-js';
import footerStyle from '@/style/components/footer.less';

const options = {
  output: '',
  isEnd: false,
  speed: 200,
  singleBack: true,
  sleep: 1000,
  type: 'rollback',
  backSpeed: 120,
  sentencePause: false,
};

const FooterBar = () => {
  const [title, setTitle] = useState<string>('');
  const easyTyper = useRef<EasyTyper | null>();

  const fetchSubtitle = () => {
    fetch('https://v1.hitokoto.cn/')
      .then((response) => response.json())
      .then(async (data) => {
        easyTyper.current = new EasyTyper(
          options,
          data.hitokoto,
          () => {
            easyTyper.current = null;
            setTimeout(() => {
              fetchSubtitle();
            }, 1000);
          },
          dispatchText,
        );
      });
  };
  const dispatchText = (text: string) => {
    setTitle(text);
  };

  useEffect(() => {
    fetchSubtitle();
  }, []);
  return (
    <div className={footerStyle.footerBar}>
      <div className={footerStyle.footerTitle}>{title}</div>
      <div className={footerStyle.footerInfo}>
        <span>浙ICP备2022011566号-1</span>
        <span>关于</span>
      </div>
    </div>
  );
};

export default FooterBar;
