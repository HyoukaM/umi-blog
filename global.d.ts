import React from 'react';
import { Dispatch } from 'umi';

declare type ReducerFC<
  P = {},
  S = {
    dispatch: Dispatch;
  },
> = React.FC<S & P>;
