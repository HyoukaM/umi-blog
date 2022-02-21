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
   * icon
   */
  describeIcon?: string;
  _id: string;
}
