import React, { useContext, useEffect, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import { CategoryType } from '@/cloudbase-api/blogInterface';
import LayoutContext from '@/context/layoutContext';

const InfoCategory = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const { categorys } = useContext(LayoutContext);
  /**
   * 获取全部标签
   */
  let getCategory = () => {
    setCategory(categorys);
  };
  useEffect(() => {
    getCategory();
  }, [categorys]);
  return (
    <div className={cardInfo.infoCategory}>
      <div className={cardInfo.infoCategoryList}>
        {category.map((i) => {
          return <span key={i._id}>{i.title}</span>;
        })}
      </div>
    </div>
  );
};

export default InfoCategory;
