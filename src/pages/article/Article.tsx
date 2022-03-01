import React, { useContext, useEffect, useState } from 'react';
import LayoutContext from '@/context/layoutContext';
import { useHistory } from 'umi';
import MarkedRender from '@/components/markedRender/MarkedRender';

const s = {
  _id: 'cd045e7561000c67004fcaa60b846f82',
  _openid: '9bf44da2dbb8473da1fcf4f591cb82ff',
  content:
    '### 🖥️关于本站\n\n学习了**React**后，我想用**React**写一个练手的小项目，于是就有了这个博客。以后在这里主要整理分享一些自己的学习心得。\n\n🔖博客主要使用到的技术如下：\n\n**前端**（博客页面+后台管理）：\n\n- `React`脚手架`Create-React-App`\n- 状态集中管理工具`Redux`\n- 前端路由`React-Router`\n- `AntD`组件库\n- <a href="https://www.jinrishici.com/" target="_blank">今日诗词</a>提供首页的诗句\n- 时间格式化工具<a href="http://momentjs.cn/" target="_blank">moment</a>\n- `markdown`格式渲染工具<a href="https://github.com/markedjs/marked" target="_blank">marked</a>\n- 代码高亮渲染工具<a href="https://highlightjs.org/" target="_blank">highlight.js</a>\n- 其他第三方包\n\n**后端**：\n\n后端使用腾讯云`CloudBase`云端一体化后端云服务，包括：\n\n- 用户管理：管理员登录、访客匿名用户登录\n- 数据库：存放管理员的博客数据\n- 网站托管：托管后台管理页面\n\n**其他**：\n\n- 评论回复的邮箱提醒`API`，使用`Node.js`编写，运行在自己的**阿里云服务器**上\n- 已配置**SSL证书**，开启**HTTPS**访问\n- 博客展示页面部署在**腾讯云开发静态页面托管**\n- 图床使用**阿里云OSS**\n- `Webify`：应用托管，自动部署**后台管理页面**\n\n\n### ✔️本站链接\n\n如果想和博主**交换友链**，可以在<a href="https://lzxjack.top/msg" target="_self">「留言板」</a>留言哦~\n\n我的链接：\n\n```\nname: 飞鸟\nlink: https://lzxjack.top/\navatar: https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20201204121004.jpg\ndescr: 一只平凡的鸟罢了。\n```\n',
  isMe: false,
};

const Article: React.FC = () => {
  const history = useHistory();
  const { blogs } = useContext(LayoutContext);
  const [pageIndex, setPageIndex] = useState<number>(0);
  /**
   * 重定向路由
   */
  const redirectPath = () => {
    const {
      location: { search, pathname },
    } = history;
    if (!blogs || !blogs.length) {
      history.push('/');
      return;
    }
    if (!search) {
      const [first] = blogs;
      const { _id } = first;
      history.push(`${pathname}?_id=${_id}`);
    }
  };

  useEffect(() => {
    redirectPath();
  }, []);

  return (
    <>
      <MarkedRender context={s.content} />
    </>
  );
};

export default Article;
