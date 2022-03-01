import React, { useContext } from 'react';
import { useHistory } from 'umi';
import homeStyle from '@/style/pages/home.less';
import LayoutContext from '@/context/layoutContext';
import MarkedRender from '@/components/markedRender/MarkedRender';

const Home: React.FC = () => {
  const { blogs = [] } = useContext(LayoutContext);
  const history = useHistory();
  /**
   * 跳转至浏览页面
   * @param _id
   */
  const previewArticle = (_id: string) => {
    history.push(`/article?_id=${_id}`);
  };

  return (
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
              <span className={homeStyle.title}>{blog.title}</span>
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
                <span className={homeStyle.separator}>|</span>
                <span>
                  <i className="fa fa-inbox" />
                  <span className={homeStyle.articleInfoTitle}>
                    {blog.categories ?? '无分类'}
                  </span>
                </span>
              </div>
              <div className={homeStyle.markedContext}>
                <MarkedRender context={blog.content} />
              </div>
            </div>
            <div className={homeStyle.cardAuthorPortrait}>
              <img
                className={homeStyle.portrait}
                src={blog.portrait ?? 'https://api.ixiaowai.cn/gqapi/gqapi.php'}
                alt="预览图"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
