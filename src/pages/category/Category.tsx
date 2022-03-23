import React, { useContext, useEffect, useState } from 'react';
import categoryStyle from '@/style/pages/category.less';
import CategoryBar from '@/components/category-bar/CategoryBar';
import { useHistory } from 'umi';
import { BlogResponse } from '@/cloudbase-api/blogInterface';
import { getQueryId } from '@/utils/reg';
import LayoutContext from '@/context/layoutContext';

const Category = () => {
  const [categorys, setCategorys] = useState<BlogResponse>([]);
  const history = useHistory();
  const { categorys: connetCategorys, blogs } = useContext(LayoutContext);

  const queryCategorys = () => {
    const {
      location: { search },
    } = history;
    const id = getQueryId(search);
    const filterCategory = connetCategorys.filter(
      (category) => category._id === id,
    );
    if (filterCategory) {
      const [first] = filterCategory;
      const filterBlogs = blogs.filter(
        (blog) => blog.categories === first.title,
      );
      setCategorys(filterBlogs);
    }
  };

  useEffect(() => {
    queryCategorys();
  }, [history.location.search, connetCategorys, blogs]);

  return (
    <div className={categoryStyle.category}>
      <CategoryBar renderCategoryTitle={true} />
      <div className={categoryStyle.categoryBody}>
        {!categorys.length && <div>暂无数据</div>}
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
