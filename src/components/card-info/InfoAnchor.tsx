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
}> = () => {
  const [levelCache, setLevelCache] = useState<{
    [key: string]: {
      level: number;
      id: string;
    };
  }>({});

  useEffect(() => {
    renderMarker.heading = (text, level, raw, slugger) => {
      if (renderMarker.options.headerIds) {
        const id = renderMarker.options.headerPrefix + slugger.slug(raw);
        // @ts-ignore
        levelCache[raw] = {
          level,
          id,
        };
        return (
          '<h' + level + ' id="' + id + '">' + text + '</h' + level + '>\n'
        );
      }
      // ignore IDs
      return '<h' + level + '>' + text + '</h' + level + '>\n';
    };
    return () => {
      setLevelCache({});
    };
  }, []);

  const linkScroll = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!Object.keys(levelCache).length) {
    return null;
  }

  return (
    <div className={cardInfo.infoAnchor}>
      <Anchor onClick={linkScroll} offsetTop={68} affix={false}>
        {Object.keys(levelCache).map((level, index) => {
          const cache = levelCache[level];
          return (
            <Link
              href={`#${cache.id}`}
              key={index}
              className={
                cache.level === 1
                  ? cardInfo.anchorLevelOne
                  : cache.level === 2
                  ? cardInfo.anchorLevelTwo
                  : ''
              }
              title={level}
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
