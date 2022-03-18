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
  icon?: string;
  goHome?: boolean;
  fontSize?: string;
}>;

declare type RoutesConfig = {
  /**
   * Any valid URL path
   */
  path?: string;
  /**
   * A React component to render only when the location matches.
   */
  component?: string | (() => any);
  wrappers?: string[];
  /**
   * navigate to a new location
   */
  redirect?: string;
  /**
   * When true, the active class/style will only be applied if the location is matched exactly.
   */
  exact?: boolean;
  routes?: any[];
  [k: string]: any;
};
