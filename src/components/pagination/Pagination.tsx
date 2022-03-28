import React from 'react';
import { BlogInterface } from '@/cloudbase-api/blogInterface';
import paginationStyle from '@/style/components/pagination.less';

interface PaginationProps {
  dataSource: BlogInterface[];
  value: string;

  onPageChange?(
    data: BlogInterface | undefined,
    index: number,
    datasource: BlogInterface[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void;

  onNextChange?(
    data: BlogInterface | undefined,
    index: number,
    datasource: BlogInterface[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void;

  onPrevChange?(
    data: BlogInterface | undefined,
    index: number,
    datasource: BlogInterface[],
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {
    dataSource = [],
    value,
    onPageChange,
    onNextChange,
    onPrevChange,
  } = props;
  const currentIndex = dataSource.findIndex((i) => i._id === value);
  if (!dataSource.length) {
    return null;
  }
  const onChange = (
    type: 'prev' | 'next',
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    let currentData;
    let index = 0;
    if (type === 'prev') {
      index = currentIndex - 1;
    } else if (type === 'next') {
      index = currentIndex + 1;
    }
    if (onPageChange) {
      if (type === 'prev') {
        currentData = dataSource.find(
          (data) => data._id === dataSource[index]._id,
        );
      } else if (type === 'next') {
        currentData = dataSource.find(
          (data) => data._id === dataSource[index]._id,
        );
      }
      onPageChange(currentData, index, dataSource, e);
    }
    if (onNextChange) {
      onNextChange(currentData, index, dataSource, e);
    }
    if (onPrevChange) {
      onPrevChange(currentData, index, dataSource, e);
    }
  };
  const nextChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange('next', e);
  };
  const prevChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onChange('prev', e);
  };
  const prev = () => {
    return (
      <div
        className={`${paginationStyle.prev} ${paginationStyle.paginationRadius}`}
        onClick={prevChange}
      >
        <span>上一页</span>
        <span>{dataSource[currentIndex - 1].title}</span>
      </div>
    );
  };
  const next = () => {
    return (
      <div
        className={`${paginationStyle.next} ${paginationStyle.paginationRadius}`}
        onClick={nextChange}
      >
        <span>下一页</span>
        <span>{dataSource[currentIndex + 1].title}</span>
      </div>
    );
  };
  if (dataSource.length - 1 === currentIndex) {
    return (
      <div className={paginationStyle.pagination} onClick={prevChange}>
        {prev()}
      </div>
    );
  }
  if (currentIndex === 0) {
    return <div className={paginationStyle.pagination}>{next()}</div>;
  }
  return (
    <div className={paginationStyle.pagination}>
      {prev()}
      {next()}
    </div>
  );
};

export default Pagination;
