import React, { useContext } from 'react';
import homeStyle from '@/style/pages/home.less';
import LayoutContext from '@/context/layoutContext';

const Home: React.FC = () => {
  const { blogs = [] } = useContext(LayoutContext);
  return (
    <div className={`${homeStyle.home} body-move`}>
      {blogs?.map((blog) => {
        return (
          <div className={homeStyle.card} key={blog._id}>
            <h2 className={homeStyle.title}>{blog.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
