import React, { useContext, useEffect, useState } from 'react';
import { CategoryType } from '@/cloudbase-api/blogInterface';
import categoryBarStyle from '@/style/components/category-bar.less';
import { useHistory } from 'umi';
import { getQueryId } from '@/utils/reg';
import LayoutContext from '@/context/layoutContext';

interface CategoryBarProps {
  renderCategoryTitle?: boolean;
}

const CategoryBar: React.FC<CategoryBarProps> = (props) => {
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [activeKey, setActiveKey] = useState<'/' | string>('/');
  const { renderCategoryTitle } = props;
  const history = useHistory();
  const { categorys } = useContext(LayoutContext);

  const categoryItemClick = (id: string) => {
    history.push(`/category?_id=${id}`);
  };

  const categoryToHome = () => {
    history.push('/');
  };

  const redirectPath = () => {
    const {
      location: { search },
    } = history;
    let id;
    if (!search) {
      id = '/';
    } else {
      id = getQueryId(search);
    }
    setActiveKey(id);
  };

  useEffect(() => {
    setCategoryList(categorys);
  }, [categorys]);

  useEffect(() => {
    redirectPath();
  }, [history.location.search]);
  return (
    <div
      className={`${
        renderCategoryTitle
          ? categoryBarStyle.categoryBarNotHover
          : categoryBarStyle.categoryBar
      }`}
    >
      {renderCategoryTitle && (
        <div className={`${categoryBarStyle.categoryBarItemTitle}`}>分类</div>
      )}
      <div className={categoryBarStyle.categoryBarHiddenBody}>
        <div
          onClick={categoryToHome}
          className={`${categoryBarStyle.categoryBarItem} ${
            activeKey === '/' ? categoryBarStyle.categoryBarItemActive : ''
          }`}
          key={'/'}
        >
          首页
        </div>
        {categoryList.map((category) => {
          return (
            <div
              onClick={() => categoryItemClick(category._id)}
              className={`${categoryBarStyle.categoryBarItem} ${
                activeKey === category._id
                  ? categoryBarStyle.categoryBarItemActive
                  : ''
              }`}
              key={category._id}
            >
              {category.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryBar;
