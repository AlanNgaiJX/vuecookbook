/* 生成营销活动海报 */

// 工具
const util = {
  formatDateInPattern: function(time, pattern) {
    if (arguments.length === 0 || !time) {
      return null;
    }
    const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
      date = time;
    } else {
      if (typeof time === "string" && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === "number" && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key];
      // Note: getDay() returns 0 on Sunday
      if (key === "a") {
        return ["日", "一", "二", "三", "四", "五", "六"][value];
      }
      if (result.length > 0 && value < 10) {
        value = "0" + value;
      }
      return value || 0;
    });
    return time_str;
  },
  loadImage: function(src) {
    return new Promise((resolve, reject) => {
      let img = new Image();

      img.crossOrigin = "*";

      img.onload = function() {
        resolve(img);
        img = null;
      };

      img.onerror = function() {
        reject("图片加载失败");
        img = null;
      };

      img.src = src;
    });
  },
};

/* 
params: 
posterData:{
    "QR_code_url": "http://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/mini_program/62eb2be2e221ae74050040e7.jpg",
    "time_begin": "2022-08-04 00:00",
    "time_end": "2022-08-07 00:00",
    "name": "雷克萨斯七夕老友记 · 您有4000元油卡待领取",
    "cover_url": "https://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/62eb2b97cde5c17e8d012918/2f5c57b632.jpg",
    "instructions": "心有欢喜 爱有引力\n雷克萨斯老友记·七夕专属礼遇 \n#转介绍购车至高享4000元油卡 \n#转发图片集赞满128个享LEXUS亲亲小熊\n（扫描二维码报名，获取活动详情）\n注：活动仅衡阳美东雷克萨斯老客户参与有效 ",
    "bg_url": "https://alanngai1996.xyz/store/temp/posterBg.png"
}

return { posterCanvas, posterUrl, download }
*/
export default async function(posterData) {
  const posterBgUrl =
    "https://alanngai1996.xyz/store/vuecookbook/posterV1/poster_bg%402x.png";
  // 加载字体
  const posterFont = new FontFace(
    "posterFont",
    "url(https://alanngai1996.xyz/store/vuecookbook/posterV1/pingfang_sc_medium.woff)"
  );

  try {
    await posterFont.load();
  } catch (error) {
    throw new Error("字体加载失败，请重试");
  }

  document.fonts.add(posterFont); // 不加入移动端会没法使用字体而使用了默认字体

  const posterRatio = 4; // 要画一个四倍图才够清晰;

  let bgImg, codeImg, coverImg;
  try {
    bgImg = await util.loadImage(posterBgUrl);
  } catch (error) {
    throw new Error("背景图加载失败");
  }

  try {
    codeImg = await util.loadImage(posterData.QR_code_url);
  } catch (error) {
    throw new Error("二维码加载失败");
  }

  try {
    coverImg = await util.loadImage(posterData.cover_url);
  } catch (error) {
    throw new Error("封面图加载失败");
  }

  // 背景图
  const design_bg = {
    width: 375,
    height: 812,
    x: 0,
    y: 0,
    img: bgImg,
  };

  // 二维码
  const design_code = {
    width: 100,
    height: 100,
    x: 243,
    y: 680,
    img: codeImg,
  };

  // 封面图
  const design_cover = {
    width: 327,
    height: 183,
    x: 24,
    y: 228,
    img: coverImg,
  };

  // 开始年
  const design_text1 = {
    content: util.formatDateInPattern(
      new Date(posterData.time_begin.replace(/-/g, "/")),
      "{y}"
    ),
    fontSize: 11,
    color: "#F17223",
    lineHeight: 13,
    width: 26,
    height: 15,
    x: 190,
    y: 6,
    fontWeight: 500,
  };

  // 结束年
  const design_text2 = {
    content: util.formatDateInPattern(
      new Date(posterData.time_end.replace(/-/g, "/")),
      "{y}"
    ),
    fontSize: 11,
    color: "#F17223",
    lineHeight: 13,
    width: 26,
    height: 15,
    x: 275,
    y: 6,
    fontWeight: 500,
  };

  // 开始月日
  const design_text3 = {
    content: util.formatDateInPattern(
      new Date(posterData.time_begin.replace(/-/g, "/")),
      "{m}.{d}"
    ),
    fontSize: 24,
    color: "#F17223",
    lineHeight: 28,
    width: 62,
    height: 34,
    x: 190,
    y: 21,
    fontWeight: 500,
  };

  // 结束月日
  const design_text4 = {
    content: util.formatDateInPattern(
      new Date(posterData.time_end.replace(/-/g, "/")),
      "{m}.{d}"
    ),
    fontSize: 24,
    color: "#F17223",
    lineHeight: 28,
    width: 60,
    height: 34,
    x: 275,
    y: 21,
    fontWeight: 500,
  };

  // -
  const design_text5 = {
    content: "—",
    fontSize: 11,
    color: "#F17223",
    lineHeight: 15,
    width: 12,
    height: 17,
    x: 257,
    y: 29,
    fontWeight: 500,
  };

  // 标题
  const titleStr =
    posterData.name.length > 23
      ? posterData.name.slice(0, 23) + "..."
      : posterData.name;

  // 标题
  const design_text6 = {
    content: titleStr,
    fontSize: 30,
    color: "#A8673B",
    lineHeight: 42,
    width: 327,
    height: 84,
    x: 24,
    y: 102,
    fontWeight: 500,
  };

  // 介绍
  const design_text7 = {
    content: posterData.instructions,
    fontSize: 15,
    color: "#999999",
    lineHeight: 30,
    width: 327,
    height: 180,
    x: 24,
    y: 441,
    fontWeight: 500,
  };

  const posterCanvas = document.createElement("canvas");

  posterCanvas.width = design_bg.width * posterRatio;
  posterCanvas.height = design_bg.height * posterRatio;
  posterCanvas.style.width = design_bg.width + "px";
  posterCanvas.style.height = design_bg.height + "px";

  const posterCanvasCtx = posterCanvas.getContext("2d");

  function drawImageBox({ width, height, x, y, img }) {
    posterCanvasCtx.translate(x * posterRatio, y * posterRatio);
    posterCanvasCtx.drawImage(
      img,
      0,
      0,
      width * posterRatio,
      height * posterRatio
    );
    posterCanvasCtx.setTransform(1, 0, 0, 1, 0, 0);
  }

  // 背景图
  drawImageBox(design_bg);
  // 二维码
  drawImageBox(design_code);
  // 封面图
  drawImageBox(design_cover);

  function drawTextBox({
    width,
    height,
    x,
    y,
    content,
    fontSize,
    color,
    lineHeight,
    fontWeight,
  }) {
    posterCanvasCtx.translate(x * posterRatio, y * posterRatio);
    posterCanvasCtx.font = `${fontWeight} ${fontSize *
      posterRatio}px posterFont`;
    posterCanvasCtx.fillStyle = color;
    posterCanvasCtx.fillText(content, 0, lineHeight * posterRatio);
    posterCanvasCtx.setTransform(1, 0, 0, 1, 0, 0);
  }

  function drawlinesTextBox(
    { width, height, x, y, content, fontSize, color, lineHeight, fontWeight },
    maxLine
  ) {
    width = width * posterRatio;
    height = height * posterRatio;
    lineHeight = lineHeight * posterRatio;

    const context = posterCanvasCtx;
    posterCanvasCtx.translate(x * posterRatio, y * posterRatio);
    posterCanvasCtx.font = `${fontWeight} ${fontSize *
      posterRatio}px posterFont`;
    posterCanvasCtx.fillStyle = color;
    context.beginPath();
    context.rect(0, 0, width, height);
    context.translate(0, lineHeight / 2);
    const regex = /([\S^\x00-\xff])|([\S\x00-\xff]+)| ([\s])/g; //匹配每一个word（规则与页面相同，一个全角字符为一个word，连续的半角字符或单个换行符为一个word）
    const words =
      content !== undefined && regex.test(content) ? content.match(regex) : [];
    let lineText = "";
    let line = 0;
    let lineWordIndex = 0;

    for (let i = 0, len = words.length; i < len; i++) {
      const word = words[i];
      // 非换行符，且文本不超出行宽时
      if (
        word !== "\n" &&
        context.measureText(lineText + word).width <= width
      ) {
        lineText += word; //不换行
        lineWordIndex++;
        // console.log(0, {lineText, word});
        if (i < len - 1) {
          continue;
        }
      }

      // 非换行符，但文本超出行宽
      if (word !== "\n" && context.measureText(lineText + word).width > width) {
        // console.log(1, {lineText, word});
        if (lineWordIndex === 0 && /^[\x00-\xff]+$/.test(word)) {
          //超过文本框宽度的一行的完全的连续半角字符，折断
          let letters = "";
          for (let j = 0; j < word.length; j++) {
            let letter = word.charAt(j);
            if (
              context.measureText(letters + letter).width <= width ||
              (letters + letter).length === 1
            ) {
              letters += letter;
            } else {
              lineText = letters;
              words[i] = word.substring(j);
              break;
            }
          }
        }
        //要换行,i--让当前word在下一行打印
        if (word !== "\n" && len != 1) {
          i--;
        }
      }

      // 换行符
      if (word == "\n") {
        // console.log(2, {lineText, word});
      }

      // 超过最大行
      if (maxLine && (line + 1 > maxLine)) {
        lineText = "...";
        let startX = 0; //绘制文字
        let lineWidth = context.measureText(lineText).width;
        for (let j = 0; j < lineText.length; j++) {
          let subStr = lineText.substring(0, j);
          context.fillText(
            lineText[j],
            startX + context.measureText(subStr).width,
            0
          );
        }
        break;
      }
      let startX = 0; //绘制文字
      // let lineWidth = context.measureText(lineText).width;
      for (let j = 0; j < lineText.length; j++) {
        let subStr = lineText.substring(0, j);
        // console.log({ lineText: lineText[j] });
        context.fillText(
          lineText[j],
          startX + context.measureText(subStr).width,
          0
        );
      }

      lineText = "";
      lineWordIndex = 0;
      context.translate(0, lineHeight);
      line++;
    }

    posterCanvasCtx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawTextBox(design_text1);
  drawTextBox(design_text2);
  drawTextBox(design_text3);
  drawTextBox(design_text4);
  drawTextBox(design_text5);
  drawlinesTextBox(design_text6);
  drawlinesTextBox(design_text7, 6);

  const posterUrl = posterCanvas.toDataURL("image/png");

  function download() {
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", posterUrl);
    downloadAnchorNode.setAttribute("download", `${posterData.name}-海报.jpg`);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return { posterCanvas, posterUrl, download };
}

export const parseQrCode = async function(url, name) {
  let codeImg;
  try {
    codeImg = await util.loadImage(url);
  } catch (error) {
    throw new Error("二维码加载失败");
  }

  const { width, height } = codeImg;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(codeImg, 0, 0, width, height);

  const codeUrl = canvas.toDataURL("image/png");

  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", codeUrl);
  downloadAnchorNode.setAttribute("download", `${name}-二维码.jpg`);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
