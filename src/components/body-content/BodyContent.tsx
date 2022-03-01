import React, { useEffect, useState } from 'react';
import bodyContentStyle from '../../style/components/body-content.less';

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
  const [title, setTitle] = useState<string>('');

  const fetchSubtitle = () => {
    fetch('https://v1.hitokoto.cn/')
      .then((response) => response.json())
      .then(async (data) => {
        await setTitle(data.hitokoto);
      });
  };

  const renderAuthorContent = () => {};

  useEffect(() => {
    fetchSubtitle();
  }, []);

  return (
    <div className={bodyContentStyle.bodyContent}>
      <div className={bodyContentStyle.content}>
        <span className={bodyContentStyle.describe}>{title}</span>
      </div>
    </div>
  );
};

export default BodyContent;
