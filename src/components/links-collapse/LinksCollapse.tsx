import React from 'react';
import { Collapse } from 'antd';
import goodArticleCollapseStyle from '@/style/components/goodArticleCollapse.less';
import MarkedRender from '@/components/markedRender/MarkedRender';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const LinksCollapse = () => {
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
      <Panel header="友情链接申请相关信息" key="1">
        <MarkedRender
          context={
            '# 本站添加友链的要求\n\n+ 能够正常访问\n+ 含作者头像\n+ 含博客背景\n+ 含博客描述\n\n请在下面的评论区填写`网站地址`、`作者`、`描述`和`博客图片url`申请友链，申请后在我不忙的时候会统一添加，给予回复。\n'
          }
        />
      </Panel>
      <Panel header="友链实例" key="2">
        <MarkedRender
          context={
            '+ `author`: hyouka\n+ `authorImage`: https://hyouka-3gvi14m1c09e066d-1257119522.tcloudbaseapp.com/app/static/favicon.3ef433a4.svg\n+ `link_`: https://hyouka-3gvi14m1c09e066d-1257119522.tcloudbaseapp.com/app#/\n+ `backgorundImage`: https://hyouka-3gvi14m1c09e066d-1257119522.tcloudbaseapp.com/app/static/favicon.3ef433a4.svg\n+ `describe`: hyouka的个人博客\n'
          }
        />
      </Panel>
    </Collapse>
  );
};

export default LinksCollapse;
