import React from 'react';
import { Collapse } from 'antd';
import goodArticleCollapseStyle from '@/style/components/goodArticleCollapse.less';
import MarkedRender from '@/components/markedRender/MarkedRender';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const GoodArticleCollapse = () => {
  return (
    <Collapse
      expandIcon={(panelProps) => {
        const { isActive } = panelProps;
        if (isActive) {
          return <CaretDownOutlined />;
        }
        return <CaretRightOutlined />;
      }}
      className={goodArticleCollapseStyle.goodArticleCollapse}
    >
      <Panel header="好文推荐申请相关信息" key="1">
        <MarkedRender
          context={
            '# 本站添加好文的要求\n\n+ 能够正常访问\n+ 含好文背景图\n+ 含好文描述\n\n请在下面的评论区填写`网站地址`、`名字`、`描述`和`网站背景图片url`申请好文，申请后在我不忙的时候会统一添加，给予回复。\n'
          }
        />
      </Panel>
      <Panel header="好文示例" key="2">
        <MarkedRender
          context={
            '+ `title`: vue文档\n+ `link_`: https://v3.cn.vuejs.org/\n+ `backgorundImage`: https://v3.cn.vuejs.org/logo.png\n+ `describe`: vue3中文文档\n+ `authorImage`: http://alexwjj.github.io/img/logo.png\n'
          }
        />
      </Panel>
    </Collapse>
  );
};

export default GoodArticleCollapse;
