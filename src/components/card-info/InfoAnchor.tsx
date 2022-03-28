import React, { useEffect, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import { connect, useHistory } from 'umi';
import { ReducerFC } from '@/global/global';
import { BlogModelState } from '@/models/blogModel';
import { getQueryId } from '@/utils/reg';
import { Anchor } from 'antd';
import { TocState } from '@/models/tocModel';

const { Link } = Anchor;

const InfoAnchor: ReducerFC<{
  toc: TocState;
}> = ({ toc }) => {
  const history = useHistory();
  const [activeId, setActiveId] = useState<string>('');
  const {
    location: { search },
  } = history;
  useEffect(() => {
    setActiveId(getQueryId(search));
  }, [history.location.search]);

  useEffect(() => {}, [history.location.search, activeId]);

  const linkScroll = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  if (!toc.toc) {
    return null;
  }

  const { toc: levelToc } = toc;

  return (
    <div className={cardInfo.infoAnchor}>
      <Anchor onClick={linkScroll} offsetTop={68} affix={false}>
        {Object.keys(levelToc).map((level, index) => {
          const cache = levelToc[level];
          const levelNumber = Number(cache.level);
          return (
            <Link
              href={`#${cache.id}`}
              key={index}
              className={
                levelNumber === 1
                  ? cardInfo.anchorLevelOne
                  : levelNumber === 2
                  ? cardInfo.anchorLevelTwo
                  : levelNumber === 3
                  ? cardInfo.anchorLevelThree
                  : ''
              }
              title={cache.title}
            />
          );
        })}
      </Anchor>
    </div>
  );
};

export default connect(({ toc }: { blogs: BlogModelState; toc: TocState }) => ({
  toc,
}))(InfoAnchor);
