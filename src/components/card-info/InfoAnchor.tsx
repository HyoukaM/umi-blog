import React, { useEffect, useRef, useState } from 'react';
import cardInfo from '@/style/components/card-info.less';
import { connect } from 'umi';
import { ReducerFC } from '@/global/global';
import { BlogModelState } from '@/models/blogModel';
import { levelAnchor } from '@/utils/reg';
import { Anchor } from 'antd';

const { Link } = Anchor;

const InfoAnchor: ReducerFC<{
  blogs: BlogModelState;
}> = (props) => {
  const { blogs } = props;
  const { currentContent } = blogs;
  const [levelList, setLevelList] = useState<
    { level: number; title: string }[]
  >([]);
  useEffect(() => {
    setLevelList(levelAnchor(currentContent));
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
              href={`#${level.title.split('.')[0]}${level.title
                .split('.')[1]
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/\.|\+|\(|\)|\/|\?|=/g, '')}`}
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
