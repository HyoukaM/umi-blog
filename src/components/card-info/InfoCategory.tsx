import React, { useContext, useEffect, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import { CategoryType } from '@/cloudbase-api/blogInterface';
import LayoutContext from '@/context/layoutContext';
import { useHistory } from 'umi';

const InfoCategory = () => {
  const [category, setCategory] = useState<CategoryType[]>([]);
  const { categorys } = useContext(LayoutContext);
  const history = useHistory();
  /**
   * 获取全部标签
   */
  const getCategory = () => {
    setCategory(categorys);
  };
  /**
   * 跳转链接
   * @param id
   */
  const linkCategory = (id: string) => {
    history.push(`category?_id=${id}`);
  };

  useEffect(() => {
    getCategory();
  }, [categorys]);
  return (
    <div className={cardInfo.infoCategory}>
      <div className={cardInfo.infoCategoryList}>
        {category.map((i) => {
          return (
            <span onClick={() => linkCategory(i._id)} key={i._id}>
              {i.title}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCategory;
