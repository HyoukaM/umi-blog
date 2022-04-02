import React, { useEffect, useState } from 'react';
import { Input, message } from 'antd';
import commentStyle from '@/style/components/comment.less';

interface CommentReplyProps {
  style?: React.CSSProperties;

  onReply?(name: string, avatar: string, content: string): void;
}

const { TextArea } = Input;

const CommentReply: React.FC<CommentReplyProps> = (props) => {
  const { style, onReply } = props;
  const [replyUserName, setReplyUserName] = useState<string>('');
  const [replyUserAvatar, setReplyUserAvatar] = useState<string>('');
  const [replyUserContent, setReplyUserContent] = useState<string>('');
  const replyInputChange = (
    type: 'content' | 'avatar' | 'name',
    value: string,
  ) => {
    const dispatch = {
      content: setReplyUserContent,
      avatar: setReplyUserAvatar,
      name: setReplyUserName,
    };
    if (dispatch[type]) {
      dispatch[type](value);
    }
  };

  const onSubmit = () => {
    if (!replyUserName || !replyUserContent) {
      message.warn('请填入必填项');
      return;
    }
    onReply && onReply(replyUserName, replyUserAvatar, replyUserContent);
  };

  const destroy = () => {
    setReplyUserName('');
    setReplyUserAvatar('');
    setReplyUserAvatar('');
  };

  useEffect(() => {
    destroy();
    return () => destroy();
  }, []);

  return (
    <div style={style}>
      <div className={commentStyle.markDown}>
        <TextArea
          bordered={false}
          value={replyUserContent}
          onChange={(e) => replyInputChange('content', e.target.value)}
          placeholder="有什么问题一起交流一下吧!"
        />
        <div className={commentStyle.markDownInfo}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm141.4 389.4c-37.8 37.8-88 58.6-141.4 58.6s-103.6-20.8-141.4-58.6S48 309.4 48 256s20.8-103.6 58.6-141.4S194.6 56 248 56s103.6 20.8 141.4 58.6S448 202.6 448 256s-20.8 103.6-58.6 141.4zM328 224c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm-160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm194.4 64H133.6c-8.2 0-14.5 7-13.5 15 7.5 59.2 58.9 105 121.1 105h13.6c62.2 0 113.6-45.8 121.1-105 1-8-5.3-15-13.5-15z"></path>
            </svg>
          </span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"></path>
            </svg>
          </span>
        </div>
      </div>
      <div className={commentStyle.action}>
        <div className={commentStyle.actionInfo}>
          <div>
            <span className={commentStyle.title}>昵称</span>
            <Input
              bordered={false}
              placeholder="必填"
              onChange={(e) => replyInputChange('name', e.target.value)}
              value={replyUserName}
            />
          </div>
          <div>
            <span className={commentStyle.title}>QQ</span>
            <Input
              bordered={false}
              placeholder="可填(获取头像)"
              onChange={(e) => replyInputChange('avatar', e.target.value)}
              value={replyUserAvatar}
            />
          </div>
        </div>
        <div className={commentStyle.submit} onClick={onSubmit}>
          <span>发送</span>
        </div>
      </div>
    </div>
  );
};

export default CommentReply;
