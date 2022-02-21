import React, { useEffect, useState } from 'react';
import bodyContentStyle from '../../style/components/body-content.less';
import avatarNode from '@/assets/logo.png';
import TypingClass from '@/utils/typing';

const _DELAY = 300;

interface BodyContentProps {
  /**
   * 是否为简介页面
   */
  isAboutMe?: boolean;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 是否自定义的subtitle
   */
  subtitle?: boolean | string;
}

const BodyContent: React.FC<BodyContentProps> = (props) => {
  const { isAboutMe, avatar = avatarNode, subtitle } = props;
  const [title, setTitle] = useState<string>('');

  const init = () => {
    const typing = new TypingClass({
      source: '#body-content-describe-output',
      output: '#body-content-describe',
      delay: _DELAY,
      async done() {
        setTimeout(async () => {
          await ((
            document.querySelector('#body-content-describe') as HTMLElement
          ).innerHTML = '');
          await fetchSubtitle();
        }, _DELAY * 50);
      },
    });
    typing.start();
  };

  const fetchSubtitle = () => {
    fetch('https://v1.hitokoto.cn/')
      .then((response) => response.json())
      .then(async (data) => {
        await setTitle(data.hitokoto);
        await init();
      });
  };

  useEffect(() => {
    if (typeof subtitle === 'string') {
      setTitle(subtitle);
    }
    if (typeof subtitle === 'boolean' || !subtitle) {
      fetchSubtitle();
    }
  }, []);

  return (
    <div className={bodyContentStyle.bodyContent}>
      <div className={bodyContentStyle.content}>
        <img className={bodyContentStyle.avatar} src={avatar} alt="图标" />
        <span
          id="body-content-describe"
          className={bodyContentStyle.describe}
        />
        <span
          id="body-content-describe-output"
          className={bodyContentStyle.describeOut}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export default BodyContent;
