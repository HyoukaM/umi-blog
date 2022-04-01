import { BlogInterface, Reply } from '@/cloudbase-api/blogInterface';

const filterArticle = (blogs: BlogInterface[], activeId: string) => {
  if (blogs) {
    return Object.assign(blogs).filter(
      (blog: BlogInterface) => blog._id === activeId,
    )[0];
  }
  return null;
};

function recursion(resource: Reply[]): Reply[] {
  const recursionResource: Reply[] = [];
  const recursionChildren = (id: string, param: Reply[]) => {
    const childReply: Reply[] = [];
    for (let i = 0; i < param.length; i++) {
      const reply = param[i];
      if (reply.ascriptionId === id) {
        childReply.push(reply);
      }
    }
    for (let i = 0; i < childReply.length; i++) {
      const reply = recursionChildren(childReply[i]._id, childReply);
      if (reply.length > 0) {
        childReply[i].reply = reply;
      }
    }
    return childReply;
  };
  if (resource && resource.length) {
    for (let i = 0; i < resource.length; i++) {
      const parent = Object.assign([], resource[i]);
      if (!parent.ascriptionId) {
        parent.reply = recursionChildren(parent._id, resource);
        recursionResource.push(parent);
      }
    }
  }
  return recursionResource;
}

const defaultCommentAvatarArr = [
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148474.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148475.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148476.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148477.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148478.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148479.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148480.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148481.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148482.webp',
  'https://cdn.jsdelivr.net/gh/lzxjack/cdn/img/202203302148483.webp',
];

export { filterArticle, recursion, defaultCommentAvatarArr };
