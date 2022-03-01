import React from 'react';
import { Dispatch } from 'umi';

declare type ReducerFC<
  P = {},
  S = {
    dispatch: Dispatch;
  },
> = React.FC<S & P>;

declare type LinksType = Array<{
  key: string;
  url: string;
  icon: string;
}>;
