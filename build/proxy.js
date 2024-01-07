/*
 * @Author: ymZhang
 * @Date: 2024-01-05 21:12:01
 * @LastEditors: ymZhang
 * @LastEditTime: 2024-01-06 20:12:57
 * @Description: 
 */

export function wrapperEnv(envConf) {
  const ret = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) { }
    }
    ret[envName] = realName;
  }
  return ret;
}
/**
 * 创建代理，用于解析 .env.development 代理配置
 * @param list
 */
export function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      // rewrite: path => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {})
    };
  }
  return ret;
}