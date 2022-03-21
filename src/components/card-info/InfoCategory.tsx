import React, { useEffect, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import query from '@/cloudbase-api/query';
import { CategoryType } from '@/cloudbase-api/blogInterface';

const InfoCategory = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  /**
   * 获取全部标签
   */
  const getCategory = () => {
    query('categories', {}).then((res) => {
      setCategory(res);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
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
