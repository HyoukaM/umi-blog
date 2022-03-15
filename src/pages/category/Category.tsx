import React, { useEffect, useState } from 'react';
import categoryStyle from '@/style/pages/category.less';
import CategoryBar from '@/components/category-bar/CategoryBar';
import { useHistory } from 'umi';
import { BlogResponse, CategoryType } from '@/cloudbase-api/blogInterface';
import query from '@/cloudbase-api/query';
import { getQueryId } from '@/utils/reg';

const Category = () => {
  const [categorys, setCategorys] = useState<BlogResponse>([]);
  const history = useHistory();

  const queryCategorys = () => {
    const {
      location: { search },
    } = history;
    const id = getQueryId(search);
    query<CategoryType[]>('categories', {
      _id: id,
    }).then((res) => {
      const [first] = res;
      query<BlogResponse>('blogs', {
        categories: first.title,
      }).then((res) => {
        setCategorys(res);
      });
    });
  };

  useEffect(() => {
    queryCategorys();
  }, [history.location.search]);

  return (
    <div className={categoryStyle.category}>
      <CategoryBar renderCategoryTitle={true} />
      <div className={categoryStyle.categoryBody}>
        {categorys.map((category) => {
          return (
            <div key={category._id} className={categoryStyle.categoryItem}>
              <img src={category.portrait} alt="背景图" />
              <div>
                <div className={categoryStyle.categoryItemTitle}>
                  {category.title}
                </div>
                <div className={categoryStyle.categoryItemTags}>
                  {category.tags.map((tag) => {
                    return <span>#{tag}</span>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
