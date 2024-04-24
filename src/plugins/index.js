import tab from './tab';
import auth from './auth';
import cache from './cache';

export default function installPlugins(app) {
  // 页签操作
  app.config.globalProperties.$tab = tab;
  // 认证对象
  app.config.globalProperties.$auth = auth;
  // 缓存对象
  app.config.globalProperties.$cache = cache;
}
