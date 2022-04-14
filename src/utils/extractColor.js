/*
 *---------------ImgMainColor提取图片中主色调的方法-------------
 *options={
 *   src: String,              必传，图片地址
 *   size: Number,             非必传，单位色块的大小（像素个数，默认40）。以单位色块的平均像素值为作为统计单位
 *   level: Number,            非必传，颜色分区参数（1-255，默认32）,以level为单位分割256个色级，默认每个通道分为8段，所以一共有8*4=32个色区
 *   exclude: Array<String>,   非必传，排除颜色数组，统计时，需要排除掉的颜色，支持格式有#FFF,#FFFFFF,rgb(0,0,0),rgba(0,0,0,0),(#FFF0第四位为alpha值,#FFFFFF00后面两位为alpha值)
 *}
 *
 * callback:Function,        必传，获取完成后的回掉函数，返回result包含四种颜色值
 *
 *   result:{
 *       hex:'#ffffff',            十六位值
 *       hexa:'#ffffff00',         十六位值带alpha值
 *       rgb:'rgb(0,0,0)',         RGB值
 *       rgba:'rgba(0,0,0,0)',      RGB值带alpha值
 *       gray:192                   灰度值，大于等于192为深色，小于192浅色
 *   }
 *
 */
class ImgMainColor {
  constructor(options, callback) {
    this.COLOR_SIZE = 40; //色块，默认40个像素
    this.EXCLUDE_COLOR = []; //排除的颜色
    this.LEVEL = 32; //默认色值分级256/32，每个8级，共8*4个等级
    this.EXCLUDE_COLOR_LEVEL = []; //排除颜色的分级
    this.RGBA_REG =
      /^rgba*\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*\d*\.*\d+\s*)*\)$/; //rgba颜色正则

    this.options = options || { src: '' };
    this.callback = callback || function () {};
    this.init();
  }

  getImgData(img) {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      return context.getImageData(0, 0, img.width, img.height).data;
    } catch (e) {
      return [];
    }
  }

  initImg(src, callback) {
    const img = new Image();
    img.src = src;
    const self = this;
    img.onload = function () {
      const imageData = self.getImgData(img);
      callback(imageData);
    };
    img.onerror = function () {
      callback([]);
      console.log('图片加载失败！');
    };
  }

  getAverageColor(colorArr) {
    const len = colorArr.length;
    let sr = 0,
      sg = 0,
      sb = 0,
      sa = 0;
    colorArr.map(function (item) {
      sr += item.r;
      sg += item.g;
      sb += item.b;
      sa += item.a;
    });
    return {
      r: Math.round(sr / len),
      g: Math.round(sg / len),
      b: Math.round(sb / len),
      a: Math.round(sa / len),
    };
  }

  getMostColor(colorData) {
    let rst = null,
      len = 0;
    for (const key in colorData) {
      !this.isKeyExclude(key) &&
        colorData[key].length > len &&
        ((rst = colorData[key]), (len = colorData[key].length));
    }
    return rst;
  }

  isKeyExclude(key) {
    for (let i = 0; i < this.EXCLUDE_COLOR_LEVEL.length; i++) {
      if (this.EXCLUDE_COLOR_LEVEL[i] === key) {
        return true;
      }
    }
    return false;
  }

  getColorLevel(color) {
    return (
      this.getLevel(color.r) +
      '_' +
      this.getLevel(color.g) +
      '_' +
      this.getLevel(color.b) +
      '_' +
      this.getLevel(color.a)
    );
  }

  getLevel(value) {
    return Math.round(value / this.LEVEL);
  }

  getBlockColor(imageData, start) {
    let data = [],
      count = this.COLOR_SIZE,
      len = this.COLOR_SIZE * 4;
    imageData.length <= start + len &&
      (count = Math.floor((imageData.length - start - 1) / 4));
    for (let i = 0; i < count; i += 4) {
      data.push({
        r: imageData[start + i + 0],
        g: imageData[start + i + 1],
        b: imageData[start + i + 2],
        a: imageData[start + i + 3],
      });
    }
    return this.getAverageColor(data);
  }

  Hex2Rgba(hex) {
    if (
      hex.length !== 4 &&
      hex.length !== 5 &&
      hex.length !== 7 &&
      hex.length !== 9
    ) {
      return { r: 0, g: 0, b: 0, a: 255 };
    }
    let len = 2;
    (hex.length === 4 || hex.length === 5) && (len = 1);
    let r = hex.substr(1, len);
    let g = hex.substr(1 + len, len);
    let b = hex.substr(1 + len * 2, len);
    let a = 'f';
    if (hex.length === 5) {
      a = hex.substr(4, 1);
    } else if (hex.length === 9) {
      a = hex.substr(7, 2);
    }
    if (len === 1) {
      r += r;
      g += g;
      b += b;
      a += a;
    }
    return {
      r: parseInt(r, 16),
      g: parseInt(g, 16),
      b: parseInt(b, 16),
      a: parseInt(a, 16),
    };
  }

  rgbaStr2Rgba(rgba) {
    rgba = rgba.replace(/rgba*|\(|\)|\s/gi, '');
    const arr = rgba.split(',');
    let alp = arr[3] ? arr[3] * 255 : 255;
    alp = alp > 255 || alp < 0 ? 255 : alp;
    return {
      r: arr[0] * 1,
      g: arr[1] * 1,
      b: arr[2] * 1,
      a: alp,
    };
  }

  initExcludeLevel() {
    for (let i = 0; i < this.EXCLUDE_COLOR.length; i++) {
      let color = this.EXCLUDE_COLOR[i] + '';
      if (color.indexOf('#') === 0) {
        color = this.Hex2Rgba(color);
      } else {
        if (this.RGBA_REG.test(color)) {
          color = this.rgbaStr2Rgba(color);
        } else {
          color = null;
        }
      }
      if (color) {
        const lvl = this.getColorLevel(color);
        this.EXCLUDE_COLOR_LEVEL.push(lvl);
      }
    }
  }

  getLevelData(imageData) {
    const len = imageData.length;
    const mapData = {};
    for (let i = 0; i < len; i += this.COLOR_SIZE * 4) {
      const blockColor = this.getBlockColor(imageData, i);
      const key = this.getColorLevel(blockColor);
      !mapData[key] && (mapData[key] = []);
      mapData[key].push(blockColor);
    }
    return mapData;
  }

  getResult(color) {
    const rgba =
      'rgba(' +
      color.r +
      ',' +
      color.g +
      ',' +
      color.b +
      ',' +
      (color.a / 255).toFixed(4).replace(/\.*0+$/, '') +
      ')';
    const rgb = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    const hex =
      '#' +
      this.Num2Hex(color.r) +
      this.Num2Hex(color.g) +
      this.Num2Hex(color.b);
    const hexa = hex + this.Num2Hex(color.a);
    // 彩色转灰度，著名的心理学公式 Gray = R*0.299 + G*0.587 + B*0.114 大于等于192为深色，小于192浅色
    const gray = Math.floor(
      color.r * 0.299 + color.g * 0.587 + color.b * 0.114,
    );
    return {
      rgba,
      rgb,
      hex,
      hexa,
      gray,
    };
  }

  Num2Hex(num) {
    const hex = num.toString(16) + '';
    if (hex.length < 2) {
      return '0' + hex;
    } else {
      return hex;
    }
  }

  init() {
    const src = this.options.src || '';
    console.log(src);
    try {
      if (!src) {
        console.log('图片地址不能为空');
      }
      typeof this.options.size == 'number' &&
        this.options.size > 0 &&
        (this.COLOR_SIZE = this.options.size);
      typeof this.options.level == 'number' &&
        this.options.level > 0 &&
        this.options.level < 255 &&
        (this.LEVEL = this.options.level);
      Object.prototype.toString.call(this.options.exclude) ===
        '[object Array]' && (this.EXCLUDE_COLOR = this.options.exclude);
    } catch (e) {
      console.log('出现了一些问题', e);
      return false;
    }
    const self = this;
    this.initImg(src, function (imageData) {
      const defRst = {
        rgb: '',
        rgba: '',
        hex: '',
        hexa: '',
      };
      if (imageData.length < 4) {
        self.callback(defRst);
      } else {
        self.initExcludeLevel();
        const mapData = self.getLevelData(imageData);
        const colors = self.getMostColor(mapData);
        if (!colors) {
          self.callback(defRst);
        } else {
          const color = self.getAverageColor(colors);
          self.callback(self.getResult(color));
        }
      }
    });
  }
}

export { ImgMainColor };
