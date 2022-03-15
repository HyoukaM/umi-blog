import React, { useContext } from 'react';
import { useHistory } from 'umi';
import homeStyle from '@/style/pages/home.less';
import LayoutContext from '@/context/layoutContext';
import { PUB_CHILD_PATH } from '@/global/database';
import CategoryBar from '@/components/category-bar/CategoryBar';

const Home: React.FC = () => {
  const { blogs = [] } = useContext(LayoutContext);
  const history = useHistory();
  /**
   * 跳转至浏览页面
   * @param _id
   */
  const previewArticle = (_id: string) => {
    history.push(`${PUB_CHILD_PATH}/article?_id=${_id}`);
  };

  return (
    <>
      <CategoryBar />
      <div className={`${homeStyle.home}`}>
        {blogs?.map((blog, index) => {
          return (
            <div
              className={`${homeStyle.card} ${
                index % 2 ? homeStyle.cardRowReverse : ''
              }`}
              key={blog._id}
              onClick={() => previewArticle(blog._id)}
            >
              <div className={`${homeStyle.cardAuthorContent}`}>
                <span className={homeStyle.title}>
                  <div className={homeStyle.titleSpan}>{blog.title}</div>
                  <div className={homeStyle.markedContext}>{blog.content}</div>
                </span>

                <div className={homeStyle.articleInfo}>
                  <span>
                    <i className="fa fa-calendar" />
                    <span className={homeStyle.articleInfoTitle}>发表与</span>
                    {blog.createDate ?? new Date().getFullYear()}
                  </span>
                  <span className={homeStyle.separator}>|</span>
                  <span>
                    <i className="fa fa-history" />
                    <span className={homeStyle.articleInfoTitle}>更新与</span>
                    {blog.updateDate ??
                      `${new Date().getFullYear()}-${
                        new Date().getMonth() + 1
                      }-${new Date().getDate()}`}
                  </span>
                </div>
              </div>
              <div className={homeStyle.cardAuthorPortrait}>
                <img
                  className={homeStyle.portrait}
                  src={
                    blog.portrait ?? 'https://api.ixiaowai.cn/gqapi/gqapi.php'
                  }
                  alt="预览图"
                />
                <div
                  className={`${
                    index % 2
                      ? homeStyle.categoriesLeft
                      : homeStyle.categoriesRight
                  }`}
                >
                  {blog.categories ?? '无分类'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
