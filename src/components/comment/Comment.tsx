import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { ReducerFC } from '@/global/global';
import { BlogModelState } from '@/models/blogModel';
import commentStyle from '@/style/components/comment.less';
import CommentMarker from '@/components/comment/CommentMarker';
import CommentReply from '@/components/comment/CommentReply';
import { Reply } from '@/cloudbase-api/blogInterface';
import update from '@/cloudbase-api/update';
import { REPLY } from '@/global/database';
import { RenderTypeState } from '@/models/renderType';
import moment from 'moment';
import add from '@/cloudbase-api/add';
import { message } from 'antd';
import { defaultCommentAvatarArr, recursion } from '@/utils';

const Comment: ReducerFC<{
  blogs: BlogModelState;
  render: RenderTypeState;
}> = (props) => {
  const {
    blogs: { reply },
    render: { type },
  } = props;
  const [recursionReply, setRecursionReply] = useState<Reply[]>([]);

  const findParent = (id: string) => {
    for (let i = 0; i < reply.length; i++) {
      const targetReply = reply[i];
      if (targetReply._id === id) {
        return targetReply;
      } else {
        if (targetReply.reply) {
          for (let j = 0; j < targetReply.reply.length; j++) {
            const childReply = targetReply.reply[j];
            if (childReply._id === id) {
              return targetReply;
            }
          }
        }
      }
    }
  };
  /**
   * 回复
   * @param name
   * @param qq
   * @param content
   * @param id
   * @param reply
   */
  const onSubmitReply = (
    name: string,
    qq: string,
    content: string,
    id: string,
    reply: Reply,
  ) => {
    const { level } = reply;
    let ascriptionId, avatar;
    const createDate = moment().format('YYYY-MM-DD');
    if (level === 2) {
      ascriptionId = findParent(id)?._id;
    }
    if (level === 1) {
      ascriptionId = id;
    }
    if (!!qq) {
      avatar = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`;
    } else {
      avatar =
        defaultCommentAvatarArr[Number(parseInt(String(10 * Math.random())))];
    }
    const replyData = {
      level: 2,
      ascriptionId,
      avatar,
      name,
      content,
      belong: type,
      createDate,
    };
    update(REPLY, findParent(id)?._id ?? '', {
      replyNumber: findParent(id)?.reply
        ? (findParent(id)?.reply?.length ?? 0) + 1
        : 1,
    });
    add(REPLY, replyData);
  };
  /**
   * 点赞
   * @param id
   * @param reply
   */
  const onSubmitLike = (id: string, reply: Reply) => {
    const responseReply = Object.assign({}, reply);
    responseReply.like = (responseReply.like ?? 0) + 1;
    const { like } = responseReply;
    update(REPLY, id, { like });
  };
  /**
   * 首次回复
   * @param name
   * @param qq
   * @param content
   */
  const onReply = (name: string, qq: string, content: string) => {
    const createDate = moment().format('YYYY-MM-DD');
    let avatar;
    if (!!qq) {
      avatar = `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=640`;
    } else {
      avatar =
        defaultCommentAvatarArr[Number(parseInt(String(10 * Math.random())))];
    }
    const replyData = {
      name,
      createDate,
      avatar,
      content,
      level: 1,
      belong: type,
    };
    add(REPLY, replyData);
    message.success('回复成功');
  };

  useEffect(() => {
    if (reply && reply.length) {
      setRecursionReply(recursion(reply.filter((i) => i.belong === type)));
    }
  }, [reply, type]);

  return (
    <div className={commentStyle.comment}>
      <div className={commentStyle.header}>
        <span className={commentStyle.faComment}>
          <i className="fa fa-comments" />
          <span>评论</span>
        </span>
        <span>隐私政策</span>
      </div>
      <CommentReply onReply={onReply} />
      <CommentMarker
        onSubmitLike={onSubmitLike}
        onSubmitReply={onSubmitReply}
        reply={recursionReply}
      />
    </div>
  );
};

export default connect(
  ({ blogs, render }: { blogs: BlogModelState; render: RenderTypeState }) => ({
    blogs,
    render,
  }),
)(Comment);
