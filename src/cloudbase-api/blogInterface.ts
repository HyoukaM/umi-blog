export interface BlogInterface {
  /**
   * 作者
   */
  author: string;
  /**
   * 描述
   */
  describe: string;
  /**
   * 背景图
   */
  portrait?: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 创建时间
   */
  createDate?: string;
  /**
   * 创建时间
   */
  updateDate?: string;
  /**
   * icon
   */
  describeIcon?: string;
  /**
   * 类型
   */
  categories?: string;
  /**
   * 文本内容
   */
  content?: string;
  /**
   * 字数统计
   */
  contentCount?: string;
  /**
   * 是否为原创
   */
  original?: boolean;
  _id: string;
}

export interface GoodArticleType {
  _id: string;
  title: string;
  link_: string;
  backgroundImage?: string;
  describe?: string;
}

export type BlogResponse = Array<BlogInterface>;
