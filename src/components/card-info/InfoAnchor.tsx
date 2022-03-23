import React, { useEffect, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import { connect } from 'umi';
import { ReducerFC } from '@/global/global';
import { BlogModelState } from '@/models/blogModel';
import { renderMarker } from '@/utils/reg';
import { Anchor } from 'antd';

const { Link } = Anchor;

const InfoAnchor: ReducerFC<{
  blogs: BlogModelState;
}> = (props) => {
  const { blogs } = props;
  const { currentContent } = blogs;
  const [levelList, setLevelList] = useState<
    { level: number; title: string; id: string }[]
  >([]);
  useEffect(() => {
    setLevelList((levelList) => {
      const toc = levelList;
      renderMarker.heading = (text, level, raw, slugger) => {
        if (renderMarker.options.headerIds) {
          const id = renderMarker.options.headerPrefix + slugger.slug(raw);
          toc.push({
            level,
            title: raw,
            id,
          });
          return (
            '<h' + level + ' id="' + id + '">' + text + '</h' + level + '>\n'
          );
        }
        // ignore IDs
        return '<h' + level + '>' + text + '</h' + level + '>\n';
      };
      return toc;
    });
  }, [currentContent]);

  const linkScroll = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!levelList.length) {
    return null;
  }

  return (
    <div className={cardInfo.infoAnchor}>
      <Anchor onClick={linkScroll} offsetTop={68} affix={false}>
        {levelList.map((level, index) => {
          return (
            <Link
              href={`#${level.id}`}
              key={index}
              className={
                level.level === 1
                  ? cardInfo.anchorLevelOne
                  : level.level === 2
                  ? cardInfo.anchorLevelTwo
                  : ''
              }
              title={level.title}
            />
          );
        })}
      </Anchor>
    </div>
  );
};

export default connect(({ blogs }: { blogs: BlogModelState }) => ({ blogs }))(
  InfoAnchor,
);
