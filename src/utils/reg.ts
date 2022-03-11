const getQueryId = (id: string): string => {
  const reg = new RegExp(/^\?_id=(.*)?&?/i);
  if (reg.test(id)) {
    return reg.exec(id)?.[1] ?? '';
  }
  return '';
};

export { getQueryId };
