const moveBody = (className: string) => {
  const bodyMove = document.querySelector(className);
  if (bodyMove) {
    setTimeout(() => {
      bodyMove?.setAttribute(
        'style',
        'transition: margin-top .8s ease-in-out; margin-top: -84px;',
      );
    }, 500);
  }
};

const scrollTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export { moveBody, scrollTop };
