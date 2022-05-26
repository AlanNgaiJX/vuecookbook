const refreshMap = {};
const scrollMap = {};

// 刷新项的模板
const refreshTaskTemp = {
  path: "", // 需要刷新的页面路由路径
  id: "", // 需要刷新那项的id
  idKey: "id", // 那项的id的属性名，如 car_id 等，默认为id
  listKey: "", // 需要刷新项所处的列表路径，即 vm[listKey]
  del: false, // 是否删除那项
  assign: null,
  fetch: null,
};

function install(router) {
  router.refreshMap = refreshMap;
  router.scrollMap = scrollMap;
  router.pushRefreshTask = pushRefreshTask;
  router.execRefreshQueue = execRefreshQueue;
  router.registKeepAlivePage = registKeepAlivePage;
  router.destroyKeepAlivePage = destroyKeepAlivePage;
  router.recordListScroll = recordListScroll;
  router.recoverListScroll = recoverListScroll;
}

function pushRefreshTask(_task) {
  if (!_task.path) {
    return console.warn("入参错误，无path");
  }
  const isPathRegisted = Object.keys(this.refreshMap).includes(_task.path);
  if (!isPathRegisted) {
    return console.warn(`pushRefreshTask reject: ${_task.path} 尚未激活为 keepAlivePage`);
  }
  if (_task.id === undefined) {
    return console.warn("入参错误，无id");
  }
  if (_task.listKey === undefined) {
    return console.warn("入参错误，无listKey");
  }
  if (!_task.del && !_task.assign && !_task.fetch) {
    return console.warn("入参错误，del、assign 和 fetch 至少填一个");
  }
  if (_task.fetch && typeof _task.fetch !== "function") {
    return console.warn("入参错误，fetch 需为返回promise的函数");
  }
  const task = JSON.parse(JSON.stringify(refreshTaskTemp));
  const path = (task.path = _task.path);
  task.id = _task.id;
  task.idKey = _task.idKey || "id";
  task.listKey = _task.listKey;
  task.del = _task.del;
  task.assign = _task.assign;
  task.fetch = _task.fetch;

  if (!refreshMap[path]) {
    refreshMap[path] = [task];
  } else {
    if (task.fetch) {
      // fetch 方式更新，队列中更新同个数组，只能有唯一id
      const isExisit =
        refreshMap[path].findIndex(
          (item) => item.id === task.id && item.listKey === task.listKey
        ) > -1;
      !isExisit && refreshMap[path].push(task);
    } else {
      // assign 方式更新，队列中可以有多个同样的id
      refreshMap[path].push(task);
    }
    refreshMap[path].push(task);
  }
}

function execRefreshQueue(vm) {
  const queue = this.refreshMap[vm.$route.path];
  if (queue) {
    while (queue.length) {
      const task = queue.pop();
      const { id, idKey, listKey, del, assign, fetch } = task;
      const list = vm[listKey];
      const targetIndex = list.findIndex((item) => item[idKey] == id);
      if (targetIndex > -1) {
        if (del) {
          list.splice(targetIndex, 1);
        } else {
          if (assign) {
            Object.assign(list[targetIndex], assign);
          }
          fetch &&
            fetch().then((res) => {
              // if (res.errcode === 0) {
              const newItem = res.data;
              list.splice(targetIndex, 1, newItem);
              // }
            });
        }
      }
    }
  }
}

function registKeepAlivePage(vm) {
  const path = vm.$route.path;
  refreshMap[path] = null;
  scrollMap[path] = null;
}

function destroyKeepAlivePage(vm) {
  if (vm.$vnode && vm.$vnode.data.keepAlive && vm.$vnode.parent) {
    const tag = vm.$vnode.tag;
    let caches = vm.$vnode.parent.componentInstance.cache;
    let keys = vm.$vnode.parent.componentInstance.keys;
    for (let [key, cache] of Object.entries(caches)) {
      if (cache.tag === tag) {
        if (keys.length > 0 && keys.includes(key)) {
          keys.splice(keys.indexOf(key), 1);
        }
        delete caches[key];
      }
    }
  }
  const path = vm.$route.path;
  delete vm.$router.refreshMap[path];
  delete vm.$router.scrollMap[path];
  vm.$destroy();
}

function recordListScroll(path, scrollListEl, scrollTop) {
  const isPathRegisted = Object.keys(this.scrollMap).includes(path);
  if (!isPathRegisted) {
    return console.warn(`recordListScroll reject: ${path} 尚未激活为 keepAlivePage`);
  }
  this.scrollMap[path] = {
    scrollListEl,
    scrollTop,
  };
}

function recoverListScroll(vm) {
  const path = vm.$route.path;
  const { scrollListEl, scrollTop } = this.scrollMap[path];
  scrollListEl.scrollTop = scrollTop;
  this.scrollMap[path] = null;
}

export default {
  install,
};
