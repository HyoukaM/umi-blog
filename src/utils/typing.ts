import Typing from 'typing.js';

interface TypingClassProps {
  source: HTMLElement | string;
  output?: HTMLElement | string;
  delay?: number;
  done?(): void;
}

export default class TypingClass {
  options: TypingClassProps;
  typing: typeof Typing | null;
  constructor(options: TypingClassProps) {
    this.options = options;
    this.init();
  }
  init() {
    const { source, output, delay = 10, done } = this.options;
    let s = source,
      o = output;
    if (typeof source === 'string') {
      s = document.querySelector(source) as HTMLElement;
    }
    if (typeof output === 'string') {
      o = document.querySelector(output) as HTMLElement;
    }
    this.typing = new Typing({
      source: s,
      output: o,
      delay,
      done,
    });
  }
  start() {
    if (!this.typing) return;
    this.typing.start();
  }
  release() {
    this.typing = null;
  }
}
