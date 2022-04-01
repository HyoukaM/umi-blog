/**
 * 文章
 */
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
  /**
   * 推荐文章
   */
  recommend?: boolean;
  /**
   * 标签
   */
  tags: string[];
  _id: string;
}

/**
 * 好文，友情推荐
 */
export interface GoodArticleType {
  _id: string;
  title?: string;
  link_: string;
  backgroundImage?: string;
  describe?: string;
  recommend?: string;
  author?: string;
  authorImage: string;
}

/**
 * 分类
 */
export interface CategoryType {
  title: string;
  _id: string;
}

/**
 * 评论
 */
export interface Reply {
  _id: string;
  /**
   * 归属ID
   */
  belong?: string;
  /**
   * 名称
   */
  name: string;
  /**
   * 点赞
   */
  like?: number;
  /**
   * 头像
   */
  avatar: string;
  createDate: string;
  /**
   * 设备
   */
  equipment: string;
  /**
   * 浏览器版本
   */
  browser: string;
  /**
   * 回复
   */
  reply?: Array<Reply>;
  /**
   * 回复数
   */
  replyNumber?: number;
  /**
   * 内容
   */
  content: string;
  /**
   * 链接
   */
  link?: string;
  /**
   * 层级
   */
  level: number;
  /**
   * 父级ID
   */
  ascriptionId?: string;
}

export type BlogResponse = Array<BlogInterface>;
