const getQueryId = (id: string): string => {
  const reg = new RegExp(/^\?_id=(.*)?&?/i);
  if (reg.test(id)) {
    return reg.exec(id)?.[1] ?? '';
  }
  return '';
};
/**
 * 获取title层级
 * @param content
 */
const levelAnchor = (content: string = '') => {
  const reg = /(#+)\s+?(.+?)\n/g;
  let regExecRes = null;
  const toc = [];
  while ((regExecRes = reg.exec(content))) {
    toc.push({
      level: regExecRes[1].length,
      title: regExecRes[2],
    });
  }
  return toc;
};

export { getQueryId, levelAnchor };
