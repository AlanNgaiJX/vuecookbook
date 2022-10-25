class Uploader {
  constructor(signatureApi) {
    this.concurrencyCount = 1; //并发数
    this.waitingQueue = []; // 待上传队列
    this.uploadingQueue = []; // 上传中队列
    this.errorQueue = []; // 上传失败队列
    this.uploadedQueue = []; // 上传成功队列
    this.choosing = false; // 是否正在选择图片
    this.uploading = false; // 是否正在上传
    this.isCheckingQueue = false;
    this.taskId = 0;
    this.loadedBuffer = 0;
    this.bufferSpeed = 0;
    this.checkQueueList = null;

    this.debug = false;

    /* 签名接口与数据 */
    this.signatureApi = signatureApi; // ()=> promise , resolve(signatureInfo)
    this.signatureInfo = null;
    // ex.
    // {
    //   "expire": "1666689212",
    //   "policy": "xxx",
    //   "signature": "xxx",
    //   "accessid": "xxx",
    //   "host": "http://xxx.oss-cn-shenzhen.aliyuncs.com",
    //   "callback": "eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vNTE3NTBtNW8yNy56aWNwLmZ1bi9vc3NfdXBsb2FkX2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5IjoiZmlsZW5hbWU9JHtvYmplY3R9JnNpemU9JHtzaXplfSZtaW1lVHlwZT0ke21pbWVUeXBlfSZoZWlnaHQ9JHtpbWFnZUluZm8uaGVpZ2h0fSZ3aWR0aD0ke2ltYWdlSW5mby53aWR0aH0iLCJjYWxsYmFja0JvZHlUeXBlIjoiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIn0=",
    //   "dir": "upload/"
    // }

    /* 回调 */
    this.onComputedId = null; // 单个文件初始化成功事件
    this.onSuccess = null; // 单个文件成功事件
    this.onError = null; // 单个文件失败事件
    this.onAllFinish = null; // 全部上传已执行事件（忽略失败任务）
    this.onAllSuccess = null; // 全部上传成功事件
    this.onProgress = null; // 进度事件
    this.eventType = null; // 上传的oss目录
  }

  uploadFiles(
    { files, onComputedId, onComputedMd5, onProgress, onSuccess, onAllSuccess, onError },
    eventType
  ) {
    const _this = this;
    _this.uploading = true; // 正在上传
    _this.loadedBuffer = 0;
    _this.bufferSpeed = 0;
    _this.onComputedId = onComputedId;
    _this.onComputedMd5 = onComputedMd5;
    _this.onSuccess = onSuccess;
    _this.onError = onError;
    _this.onAllSuccess = onAllSuccess;
    _this.onProgress = onProgress;
    _this.eventType = eventType;

    let i = 0;

    // 检查上传队列，开始上传
    _this.checkQueueList = function() {
      if (_this.waitingQueue.length !== 0 && _this.uploadingQueue.length < _this.concurrencyCount) {
        _this.isCheckingQueue = true;
        const uploadTask = _this.waitingQueue.shift();
        _this.uploadingQueue.push(uploadTask);
        getSignature()
          .then(() => uploadToOss(uploadTask))
          .catch(() => {
            // 从上传中队列移出
            Uploader.removeOutOf(_this.uploadingQueue, uploadTask);
            onUploadError(uploadTask);
            // 检测上传队列
            _this.checkQueueList();
          });
      } else if (_this.waitingQueue.length === 0 && _this.uploadingQueue.length === 0) {
        _this.isCheckingQueue = false;
        _this.uploading = false;
        _this.bufferSpeed = 0;
        _this.loadedBuffer = 0;
        // 全部完成，（此时忽略上传失败，默认为全部已完成）
        onUploadAllFinish();

        if (_this.errorQueue.length === 0) {
          // 此时没有失败任务则全部成功
          onUploadAllSuccess();
        }
      }
    };

    judge();

    // 枢纽1
    function judge() {
      if (i < files.length) {
        initQueue();
      } else {
        // 检查上传列表
        _this.checkQueueList();
      }
    }

    // 装配上传队列
    function initQueue() {
      const file = files[i];
      /* 任务初始化 */
      const uploadTask = {
        id: _this.taskId,
        url: window.URL.createObjectURL(file),
        suffix: Uploader.getFileSuffix(file.name),
        status: "wait",
        file
      };
      _this.waitingQueue.push(uploadTask);
      onUploadComputedId(uploadTask);
      _this.taskId++;

      /* 计算md5 */
      const chunkedBlob = Uploader.chunckFileToBlob(file);
      const fr = new FileReader();
      fr.onload = () => {
        uploadTask.md5 = Uploader.getFileMd5(fr.result, file);
        onUploadComputedMd5(uploadTask);
      };
      fr.readAsDataURL(chunkedBlob);

      i++;
      judge();
    }

    //上传前获取签名 update标记说明需要更新
    function getSignature(forceUpdate) {
      return new Promise((resolve, reject) => {
        if (!_this.signatureInfo || forceUpdate) {
          _this
            .signatureApi()
            .then(info => {
              _this.signatureInfo = info;
              resolve();
            })
            .catch(() => {
              reject();
            });
        } else {
          resolve();
        }
      });
    }

    // 上传到oss
    function uploadToOss(uploadTask) {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        !_this.debug ? _this.signatureInfo.host : _this.signatureInfo.host + "123",
        true
      );
      xhr.onload = e => {
        if (e.target.readyState == 4 && e.target.status == 200) {
          const response = JSON.parse(e.target.responseText);
          const data = response.data;
          // ex.
          // {
          //   "Status": "Ok",
          //   "baseUrl": "https://alanngai1996.xyz/",
          //   "filename": "upload/c4f0c78a26.JPG",
          //   "size": "195980",
          //   "mimeType": "image/jpeg",
          //   "height": "560",
          //   "width": "3000",
          //   "url": "https://alanngai1996.xyz/upload/c4f0c78a26.JPG"
          // }
          if (data.Status === "Ok") {
            // 上传成功
            // 从上传中队列移出
            Uploader.removeOutOf(_this.uploadingQueue, uploadTask);
            // 加入上传成功队列
            uploadTask.uploadedUrl = data.url;
            _this.uploadedQueue.push(uploadTask);
            onUploadSuccess(uploadTask);
            // 继续队列
            _this.checkQueueList();
          } else {
            // 上传失败
            cbFail();
          }
        } else {
          // 上传失败
          cbFail();
        }
      };
      //上传过程中执行
      xhr.upload.onprogress = function(e) {
        const progress = e.loaded / e.total;

        _this.bufferSpeed += e.loaded - _this.loadedBuffer;
        _this.loadedBuffer = e.loaded;
        //变更进度
        onUploadProgress(uploadTask, "loading", progress);
      };
      xhr.onerror = () => {
        cbFail();
      };

      function cbFail() {
        // 从上传中队列移出
        Uploader.removeOutOf(_this.uploadingQueue, uploadTask);
        onUploadError(uploadTask);
        // 检测上传队列
        _this.checkQueueList();
      }

      const formData = new FormData();
      formData.append("name", `${uploadTask.md5}.${uploadTask.suffix}`);
      formData.append("key", `${_this.signatureInfo.dir}${uploadTask.md5}.${uploadTask.suffix}`);
      formData.append("policy", _this.signatureInfo.policy);
      formData.append("OSSAccessKeyId", _this.signatureInfo.accessid);
      formData.append("success_action_status", "200");
      formData.append("signature", _this.signatureInfo.signature);
      formData.append("callback", _this.signatureInfo.callback);
      formData.append("file", uploadTask.file);

      xhr.send(formData);

      uploadTask.xhr = xhr;
    }

    // 初始化回调处理器
    function onUploadComputedId(uploadTask) {
      onUploadProgress(uploadTask, "inited");
      if (typeof _this.onComputedId == "function") {
        _this.onComputedId(Object.assign({}, uploadTask));
      }
    }

    // md5回调处理器
    function onUploadComputedMd5(uploadTask) {
      onUploadProgress(uploadTask, "md5");
      if (typeof _this.onComputedMd5 == "function") {
        _this.onComputedMd5(Object.assign({}, uploadTask));
      }
    }

    // 进度回调处理器
    function onUploadProgress(uploadTask, status, progress = null) {
      uploadTask.status = status;
      uploadTask.progress = progress;
      if (typeof _this.onProgress == "function") {
        _this.onProgress(Object.assign({}, uploadTask));
      }
    }

    // 成功回调处理器
    function onUploadSuccess(uploadTask) {
      onUploadProgress(uploadTask, "success");

      if (typeof _this.onSuccess == "function") {
        // 还剩余多少个未上传
        const existCount =
          _this.waitingQueue.length + _this.uploadingQueue.length + _this.errorQueue.length;

        _this.onSuccess(Object.assign({}, uploadTask), existCount);
      }
    }

    // 全部完成回调处理器
    function onUploadAllFinish() {
      if (typeof _this.onAllFinish == "function") {
        _this.onAllFinish();
      }
    }

    // 全部上传成功回调处理器
    function onUploadAllSuccess() {
      if (typeof _this.onAllSuccess == "function") {
        _this.onAllSuccess();
      }
    }

    // 失败回调处理器
    function onUploadError(uploadTask) {
      onUploadProgress(uploadTask, "fail");
      _this.errorQueue.push(uploadTask);

      if (typeof _this.onError == "function") {
        _this.onError(Object.assign({}, uploadTask));
      }
    }
  }

  // 打开或关闭调试, 该调试开关能使上传任务失败
  toggleDebug() {
    this.debug = !this.debug;
  }

  // 重试所有失败任务
  retryErrorQueue() {
    while (this.errorQueue.length) {
      const uploadTask = this.errorQueue.shift();
      const { id, url, suffix, file, md5 } = uploadTask;
      const _uploadTask = {
        id,
        url,
        suffix,
        file,
        md5,
        status: "md5"
      };

      this.waitingQueue.push(_uploadTask);
    }
    if (!this.isCheckingQueue) {
      this.checkQueueList && this.checkQueueList();
    }
  }

  // 重试单个失败任务
  retryErrorTaskById(taskId) {
    const uploadTaskIndex = this.errorQueue.findIndex(item => item.id === Number(taskId));
    if (uploadTaskIndex > -1) {
      const uploadTask = this.errorQueue.splice(uploadTaskIndex, 1)[0];
      const { id, url, suffix, file, md5 } = uploadTask;
      const _uploadTask = {
        id,
        url,
        suffix,
        file,
        md5,
        status: "md5"
      };

      this.waitingQueue.push(_uploadTask);

      if (!this.isCheckingQueue) {
        this.checkQueueList && this.checkQueueList();
      }
    }
  }

  // 从任何队列移除某一任务
  delTaskById(taskId) {
    const task = { id: Number(taskId) };
    Uploader.removeOutOf(this.waitingQueue, task);
    Uploader.removeOutOf(this.uploadingQueue, task);
    Uploader.removeOutOf(this.uploadedQueue, task);
    Uploader.removeOutOf(this.errorQueue, task);
  }

  // 从某个队列移出某项(id)
  static removeOutOf(list, uploadTask) {
    for (let i = 0; i < list.length; i++) {
      const id = list[i].id;
      if (id == uploadTask.id) {
        list.splice(i, 1);
      }
    }
  }

  // 计算md5
  static getFileMd5(frResult, file, salt = "") {
    var md5 = CryptoJS.MD5(frResult + file.lastModified + salt).toString();
    return [
      md5.substring(0, 8),
      md5.substring(8, 12),
      md5.substring(12, 16),
      md5.substring(16, 20),
      md5.substring(20, 32)
    ].join("-");
  }

  // 大文件分片再转blob (适配200m以上的文件计算md5会失败)
  static chunckFileToBlob(file) {
    file.slice = file.slice || file.webkitSlice;

    const filePart1 = file.slice(0, 100);
    const filePart2 = file.slice(file.size / 2 - 50, file.size / 2 + 50);
    const filePart3 = file.slice(file.size - 100, file.size);

    return new Blob([filePart1, filePart2, filePart3]);
  }

  // 获取文件后缀
  static getFileSuffix(filename) {
    const pos = filename.lastIndexOf(".");
    let suffix = "";
    if (pos != -1) {
      suffix = filename.substring(pos + 1);
    }
    return suffix;
  }

  // 展示上传速度
  static parseBufferSpeed(bufferSpeed) {
    if (bufferSpeed > 1024 * 1024) {
      bufferSpeed = (bufferSpeed / (1024 * 1024)).toFixed(1) + "MB/s";
    } else {
      bufferSpeed = Math.round(bufferSpeed / 1024) + "KB/s";
    }
    return bufferSpeed;
  }
}

export default Uploader;

/*
CryptoJS v3.1.2 用于计算文件md5
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS =
  CryptoJS ||
  (function(h, r) {
    var k = {},
      l = (k.lib = {}),
      n = function() {},
      f = (l.Base = {
        extend: function(a) {
          n.prototype = this;
          var b = new n();
          a && b.mixIn(a);
          b.hasOwnProperty("init") ||
            (b.init = function() {
              b.$super.init.apply(this, arguments);
            });
          b.init.prototype = b;
          b.$super = this;
          return b;
        },
        create: function() {
          var a = this.extend();
          a.init.apply(a, arguments);
          return a;
        },
        init: function() {},
        mixIn: function(a) {
          for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
          a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function() {
          return this.init.prototype.extend(this);
        }
      }),
      j = (l.WordArray = f.extend({
        init: function(a, b) {
          a = this.words = a || [];
          this.sigBytes = b != r ? b : 4 * a.length;
        },
        toString: function(a) {
          return (a || s).stringify(this);
        },
        concat: function(a) {
          var b = this.words,
            d = a.words,
            c = this.sigBytes;
          a = a.sigBytes;
          this.clamp();
          if (c % 4)
            for (var e = 0; e < a; e++)
              b[(c + e) >>> 2] |=
                ((d[e >>> 2] >>> (24 - 8 * (e % 4))) & 255) << (24 - 8 * ((c + e) % 4));
          else if (65535 < d.length) for (e = 0; e < a; e += 4) b[(c + e) >>> 2] = d[e >>> 2];
          else b.push.apply(b, d);
          this.sigBytes += a;
          return this;
        },
        clamp: function() {
          var a = this.words,
            b = this.sigBytes;
          a[b >>> 2] &= 4294967295 << (32 - 8 * (b % 4));
          a.length = h.ceil(b / 4);
        },
        clone: function() {
          var a = f.clone.call(this);
          a.words = this.words.slice(0);
          return a;
        },
        random: function(a) {
          for (var b = [], d = 0; d < a; d += 4) b.push((4294967296 * h.random()) | 0);
          return new j.init(b, a);
        }
      })),
      m = (k.enc = {}),
      s = (m.Hex = {
        stringify: function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var d = [], c = 0; c < a; c++) {
            var e = (b[c >>> 2] >>> (24 - 8 * (c % 4))) & 255;
            d.push((e >>> 4).toString(16));
            d.push((e & 15).toString(16));
          }
          return d.join("");
        },
        parse: function(a) {
          for (var b = a.length, d = [], c = 0; c < b; c += 2)
            d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << (24 - 4 * (c % 8));
          return new j.init(d, b / 2);
        }
      }),
      p = (m.Latin1 = {
        stringify: function(a) {
          var b = a.words;
          a = a.sigBytes;
          for (var d = [], c = 0; c < a; c++)
            d.push(String.fromCharCode((b[c >>> 2] >>> (24 - 8 * (c % 4))) & 255));
          return d.join("");
        },
        parse: function(a) {
          for (var b = a.length, d = [], c = 0; c < b; c++)
            d[c >>> 2] |= (a.charCodeAt(c) & 255) << (24 - 8 * (c % 4));
          return new j.init(d, b);
        }
      }),
      t = (m.Utf8 = {
        stringify: function(a) {
          try {
            return decodeURIComponent(escape(p.stringify(a)));
          } catch (b) {
            throw Error("Malformed UTF-8 data");
          }
        },
        parse: function(a) {
          return p.parse(unescape(encodeURIComponent(a)));
        }
      }),
      q = (l.BufferedBlockAlgorithm = f.extend({
        reset: function() {
          this._data = new j.init();
          this._nDataBytes = 0;
        },
        _append: function(a) {
          "string" == typeof a && (a = t.parse(a));
          this._data.concat(a);
          this._nDataBytes += a.sigBytes;
        },
        _process: function(a) {
          var b = this._data,
            d = b.words,
            c = b.sigBytes,
            e = this.blockSize,
            f = c / (4 * e),
            f = a ? h.ceil(f) : h.max((f | 0) - this._minBufferSize, 0);
          a = f * e;
          c = h.min(4 * a, c);
          if (a) {
            for (var g = 0; g < a; g += e) this._doProcessBlock(d, g);
            g = d.splice(0, a);
            b.sigBytes -= c;
          }
          return new j.init(g, c);
        },
        clone: function() {
          var a = f.clone.call(this);
          a._data = this._data.clone();
          return a;
        },
        _minBufferSize: 0
      }));
    l.Hasher = q.extend({
      cfg: f.extend(),
      init: function(a) {
        this.cfg = this.cfg.extend(a);
        this.reset();
      },
      reset: function() {
        q.reset.call(this);
        this._doReset();
      },
      update: function(a) {
        this._append(a);
        this._process();
        return this;
      },
      finalize: function(a) {
        a && this._append(a);
        return this._doFinalize();
      },
      blockSize: 16,
      _createHelper: function(a) {
        return function(b, d) {
          return new a.init(d).finalize(b);
        };
      },
      _createHmacHelper: function(a) {
        return function(b, d) {
          return new u.HMAC.init(a, d).finalize(b);
        };
      }
    });
    var u = (k.algo = {});
    return k;
  })(Math);

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js MD5模块
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(E) {
  function h(a, f, g, j, p, h, k) {
    a = a + ((f & g) | (~f & j)) + p + k;
    return ((a << h) | (a >>> (32 - h))) + f;
  }
  function k(a, f, g, j, p, h, k) {
    a = a + ((f & j) | (g & ~j)) + p + k;
    return ((a << h) | (a >>> (32 - h))) + f;
  }
  function l(a, f, g, j, h, k, l) {
    a = a + (f ^ g ^ j) + h + l;
    return ((a << k) | (a >>> (32 - k))) + f;
  }
  function n(a, f, g, j, h, k, l) {
    a = a + (g ^ (f | ~j)) + h + l;
    return ((a << k) | (a >>> (32 - k))) + f;
  }
  for (
    var r = CryptoJS, q = r.lib, F = q.WordArray, s = q.Hasher, q = r.algo, a = [], t = 0;
    64 > t;
    t++
  )
    a[t] = (4294967296 * E.abs(E.sin(t + 1))) | 0;
  q = q.MD5 = s.extend({
    _doReset: function() {
      this._hash = new F.init([1732584193, 4023233417, 2562383102, 271733878]);
    },
    _doProcessBlock: function(m, f) {
      for (var g = 0; 16 > g; g++) {
        var j = f + g,
          p = m[j];
        m[j] = (((p << 8) | (p >>> 24)) & 16711935) | (((p << 24) | (p >>> 8)) & 4278255360);
      }
      var g = this._hash.words,
        j = m[f + 0],
        p = m[f + 1],
        q = m[f + 2],
        r = m[f + 3],
        s = m[f + 4],
        t = m[f + 5],
        u = m[f + 6],
        v = m[f + 7],
        w = m[f + 8],
        x = m[f + 9],
        y = m[f + 10],
        z = m[f + 11],
        A = m[f + 12],
        B = m[f + 13],
        C = m[f + 14],
        D = m[f + 15],
        b = g[0],
        c = g[1],
        d = g[2],
        e = g[3],
        b = h(b, c, d, e, j, 7, a[0]),
        e = h(e, b, c, d, p, 12, a[1]),
        d = h(d, e, b, c, q, 17, a[2]),
        c = h(c, d, e, b, r, 22, a[3]),
        b = h(b, c, d, e, s, 7, a[4]),
        e = h(e, b, c, d, t, 12, a[5]),
        d = h(d, e, b, c, u, 17, a[6]),
        c = h(c, d, e, b, v, 22, a[7]),
        b = h(b, c, d, e, w, 7, a[8]),
        e = h(e, b, c, d, x, 12, a[9]),
        d = h(d, e, b, c, y, 17, a[10]),
        c = h(c, d, e, b, z, 22, a[11]),
        b = h(b, c, d, e, A, 7, a[12]),
        e = h(e, b, c, d, B, 12, a[13]),
        d = h(d, e, b, c, C, 17, a[14]),
        c = h(c, d, e, b, D, 22, a[15]),
        b = k(b, c, d, e, p, 5, a[16]),
        e = k(e, b, c, d, u, 9, a[17]),
        d = k(d, e, b, c, z, 14, a[18]),
        c = k(c, d, e, b, j, 20, a[19]),
        b = k(b, c, d, e, t, 5, a[20]),
        e = k(e, b, c, d, y, 9, a[21]),
        d = k(d, e, b, c, D, 14, a[22]),
        c = k(c, d, e, b, s, 20, a[23]),
        b = k(b, c, d, e, x, 5, a[24]),
        e = k(e, b, c, d, C, 9, a[25]),
        d = k(d, e, b, c, r, 14, a[26]),
        c = k(c, d, e, b, w, 20, a[27]),
        b = k(b, c, d, e, B, 5, a[28]),
        e = k(e, b, c, d, q, 9, a[29]),
        d = k(d, e, b, c, v, 14, a[30]),
        c = k(c, d, e, b, A, 20, a[31]),
        b = l(b, c, d, e, t, 4, a[32]),
        e = l(e, b, c, d, w, 11, a[33]),
        d = l(d, e, b, c, z, 16, a[34]),
        c = l(c, d, e, b, C, 23, a[35]),
        b = l(b, c, d, e, p, 4, a[36]),
        e = l(e, b, c, d, s, 11, a[37]),
        d = l(d, e, b, c, v, 16, a[38]),
        c = l(c, d, e, b, y, 23, a[39]),
        b = l(b, c, d, e, B, 4, a[40]),
        e = l(e, b, c, d, j, 11, a[41]),
        d = l(d, e, b, c, r, 16, a[42]),
        c = l(c, d, e, b, u, 23, a[43]),
        b = l(b, c, d, e, x, 4, a[44]),
        e = l(e, b, c, d, A, 11, a[45]),
        d = l(d, e, b, c, D, 16, a[46]),
        c = l(c, d, e, b, q, 23, a[47]),
        b = n(b, c, d, e, j, 6, a[48]),
        e = n(e, b, c, d, v, 10, a[49]),
        d = n(d, e, b, c, C, 15, a[50]),
        c = n(c, d, e, b, t, 21, a[51]),
        b = n(b, c, d, e, A, 6, a[52]),
        e = n(e, b, c, d, r, 10, a[53]),
        d = n(d, e, b, c, y, 15, a[54]),
        c = n(c, d, e, b, p, 21, a[55]),
        b = n(b, c, d, e, w, 6, a[56]),
        e = n(e, b, c, d, D, 10, a[57]),
        d = n(d, e, b, c, u, 15, a[58]),
        c = n(c, d, e, b, B, 21, a[59]),
        b = n(b, c, d, e, s, 6, a[60]),
        e = n(e, b, c, d, z, 10, a[61]),
        d = n(d, e, b, c, q, 15, a[62]),
        c = n(c, d, e, b, x, 21, a[63]);
      g[0] = (g[0] + b) | 0;
      g[1] = (g[1] + c) | 0;
      g[2] = (g[2] + d) | 0;
      g[3] = (g[3] + e) | 0;
    },
    _doFinalize: function() {
      var a = this._data,
        f = a.words,
        g = 8 * this._nDataBytes,
        j = 8 * a.sigBytes;
      f[j >>> 5] |= 128 << (24 - (j % 32));
      var h = E.floor(g / 4294967296);
      f[(((j + 64) >>> 9) << 4) + 15] =
        (((h << 8) | (h >>> 24)) & 16711935) | (((h << 24) | (h >>> 8)) & 4278255360);
      f[(((j + 64) >>> 9) << 4) + 14] =
        (((g << 8) | (g >>> 24)) & 16711935) | (((g << 24) | (g >>> 8)) & 4278255360);
      a.sigBytes = 4 * (f.length + 1);
      this._process();
      a = this._hash;
      f = a.words;
      for (g = 0; 4 > g; g++)
        (j = f[g]),
          (f[g] = (((j << 8) | (j >>> 24)) & 16711935) | (((j << 24) | (j >>> 8)) & 4278255360));
      return a;
    },
    clone: function() {
      var a = s.clone.call(this);
      a._hash = this._hash.clone();
      return a;
    }
  });
  r.MD5 = s._createHelper(q);
  r.HmacMD5 = s._createHmacHelper(q);
})(Math);
