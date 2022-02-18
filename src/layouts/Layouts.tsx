import React from 'react';
import layoutStyle from './layout.less';
import Header from '@/components/header/Header';
import '../style/index.less';

const Layouts: React.FC = (props) => {
  const { children } = props;
  return (
    <div className={layoutStyle.layout}>
      <Header />
      {children}
    </div>
  );
};

export default Layouts;
