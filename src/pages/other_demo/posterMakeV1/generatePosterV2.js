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
    "QR_code_url": "http://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/mini_program/62bc054fc16f7ca05fc3d826.jpg",
    "time_begin": "2022-06-15 00:00",
    "time_end": "2022-07-14 00:00",
    "name": "04",
    "cover_url": "https://mcc0507.oss-cn-shenzhen.aliyuncs.com/marketing_activity/62bac7c325e32594b11e749f/8ca689a975.png",
    "instructions": "test\n\n测试\n\n啊啊啊啊啊",
    "bg_url": "https://alanngai1996.xyz/store/temp/posterBg.png"
}

return { posterCanvas, posterUrl, download }
*/
export default async function(posterData) {
  // 加载字体
  const posterFont = new FontFace(
    "posterFont",
    "url(https://alanngai1996.xyz/store/vuecookbook/posterV2/pingfang_sc_medium.woff)"
  );

  try {
    await posterFont.load();
  } catch (error) {
    throw new Error("字体加载失败，请重试");
  }

  document.fonts.add(posterFont); // 不加入移动端会没法使用字体而使用了默认字体

  const posterRatio = 4; // 要画一个四倍图才够清晰;

  // 背景图
  const design_bg = {
    width: 375,
    // height: 812,
    minHeight: 812,
    x: 0,
    y: 0,
    // img: bgImg,
  };

  // 背景1
  const bg_slice1 = {
    width: 375,
    height: 195,
    x: 0,
    y: 0,
    img: null,
    img_url:
      "https://alanngai1996.xyz/store/vuecookbook/posterV2/bg_slice_1.png",
  };

  // 背景2
  const bg_slice2 = {
    width: 375,
    height: 230,
    x: 0,
    y: 195,
    img: null,
    img_url:
      "https://alanngai1996.xyz/store/vuecookbook/posterV2/bg_slice_2.png",
  };

  // 背景3
  const bg_slice3 = {
    width: 375,
    height: 192,
    x: 0,
    y: 620,
    img: null,
    img_url:
      "https://alanngai1996.xyz/store/vuecookbook/posterV2/bg_slice_3.png",
  };

  // 二维码
  const design_code = {
    width: 100,
    height: 100,
    x: 243,
    y: 680,
    img: null,
    img_url: posterData.QR_code_url,
  };

  // 封面图
  const design_cover = {
    width: 327,
    height: 183,
    x: 24,
    y: 228,
    img: null,
    img_url: posterData.cover_url,
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
  const titleStr = posterData.name;

  // 标题
  const design_text6 = {
    content: titleStr,
    fontSize: 30,
    color: "#A8673B",
    lineHeight: 42,
    width: 327,
    minHeight: 84,
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
    minHeight: 168,
    x: 24,
    y: 441,
    fontWeight: 500,
  };

  try {
    bg_slice1.img = await util.loadImage(bg_slice1.img_url);
    bg_slice2.img = await util.loadImage(bg_slice2.img_url);
    bg_slice3.img = await util.loadImage(bg_slice3.img_url);
  } catch (error) {
    throw new Error("背景图加载失败");
  }

  try {
    design_code.img = await util.loadImage(posterData.QR_code_url);
  } catch (error) {
    throw new Error("二维码加载失败");
  }

  try {
    design_cover.img = await util.loadImage(posterData.cover_url);
  } catch (error) {
    throw new Error("封面图加载失败");
  }

  let posterCanvas = document.createElement("canvas");
  let posterCanvasCtx = posterCanvas.getContext("2d");
  let posterHeight = design_bg.minHeight;
  let posterWidth = design_bg.width;
  posterCanvas.width = posterWidth * posterRatio;
  posterCanvas.height = posterHeight * posterRatio; // 初始化为最小高度
  posterCanvasCtx.fillStyle = "#ffffff";
  posterCanvasCtx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

  posterCanvas.style.width = posterWidth + "px";
  posterCanvas.style.height = posterHeight + "px"; // 初始化为最小高度

  function resizePoster(offsetHeight) {
    const canvasData = posterCanvasCtx.getImageData(
      0,
      0,
      posterCanvas.width,
      posterCanvas.height
    );
    posterHeight += offsetHeight;
    const w = posterCanvas.width;
    const h = posterCanvas.height;
    posterCanvas.height = posterHeight * posterRatio;
    posterCanvasCtx.fillStyle = "#ffffff";
    posterCanvasCtx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);
    posterCanvasCtx.putImageData(canvasData, 0, 0, 0, 0, w, h);
    posterCanvas.style.width = posterWidth + "px";
    posterCanvas.style.height = posterHeight + "px";
  }

  // 绘制第一部分
  (function drawPart1() {
    // 背景图切片 1
    drawImageBox(bg_slice1);
    drawTextBox(design_text1);
    drawTextBox(design_text2);
    drawTextBox(design_text3);
    drawTextBox(design_text4);
    drawTextBox(design_text5);
    drawlinesTextBox(
      design_text6,
      ({ linesTextBoxHeight, renderLineTextList }) => {
        // 文字超过设置高度，撑开
        const offsetHeight = linesTextBoxHeight - design_text6.minHeight;
        bg_slice2.y += offsetHeight;
        design_cover.y += offsetHeight;
        design_text7.y += offsetHeight;
        design_code.y += offsetHeight;
        bg_slice3.y += offsetHeight;
        resizePoster(offsetHeight + 20); // 重置海报尺寸后再渲染文本
        renderLineTextList();
      }
    );
  })();

  // 绘制第二部分
  (function drawPart2() {
    drawImageBox(bg_slice2);
    drawImageBox(design_cover);
  })();

  // 绘制第三部分
  (function drawPart3() {
    drawlinesTextBox(
      design_text7,
      ({ linesTextBoxHeight, renderLineTextList }) => {
        // 文字超过设置高度，撑开
        const offsetHeight = linesTextBoxHeight - design_text7.minHeight;
        design_code.y += offsetHeight;
        bg_slice3.y += offsetHeight;
        resizePoster(offsetHeight);
        renderLineTextList();
      }
    );
  })();

  // 绘制第四部分
  (function drawPart4() {
    drawImageBox(bg_slice3);
    drawImageBox(design_code);
  })();

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
    {
      width,
      minHeight,
      x,
      y,
      content,
      fontSize,
      color,
      lineHeight,
      fontWeight,
    },
    cbLineCounted,
    maxLine
  ) {
    const context = posterCanvasCtx;

    width = width * posterRatio;
    lineHeight = lineHeight * posterRatio;

    initContextSeeting();

    const regex = /([\S^\x00-\xff])|([\S\x00-\xff]+)| ([\s])/g; //匹配每一个word（规则与页面相同，一个全角字符为一个word，连续的半角字符或单个换行符为一个word）
    const words =
      content !== undefined && regex.test(content) ? content.match(regex) : [];

    let lineText = "";
    let line = 0;
    let lineWordIndex = 0;
    const lineTextList = [];

    for (let i = 0, len = words.length; i < len; i++) {
      const word = words[i];
      // 非换行符，且文本不超出行宽时
      if (
        word !== "\n" &&
        context.measureText(lineText + word).width <= width
      ) {
        lineText += word; //不换行
        lineWordIndex++;
        if (i < len - 1) {
          continue;
        }
      }

      // 非换行符，但文本超出行宽
      if (word !== "\n" && context.measureText(lineText + word).width > width) {
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
      if (maxLine && line + 1 > maxLine) {
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

      lineTextList.push(lineText);
      lineText = "";
      lineWordIndex = 0;
      line++;
    }

    const linesTextBoxHeight = (line * lineHeight) / posterRatio;
    if (linesTextBoxHeight > minHeight) {
      cbLineCounted({ linesTextBoxHeight, renderLineTextList });
    } else {
      renderLineTextList();
    }

    function initContextSeeting() {
      const context = posterCanvasCtx;
      context.font = `${fontWeight} ${fontSize * posterRatio}px posterFont`;
      context.fillStyle = color;
    }

    function renderLineTextList() {
      initContextSeeting();
      const context = posterCanvasCtx;
      context.translate(x * posterRatio, y * posterRatio);
      context.translate(0, lineHeight / 2);
      context.beginPath();
      context.rect(0, 0, width, minHeight * posterRatio);
      lineTextList.forEach((lineText, index) => {
        const line = index + 1;
        let startX = 0; //绘制文字
        for (let j = 0; j < lineText.length; j++) {
          let subStr = lineText.substring(0, j);
          context.fillText(
            lineText[j],
            startX + context.measureText(subStr).width,
            0
          );
        }
        context.translate(0, lineHeight);
      });
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
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
