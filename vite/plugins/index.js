import vue from '@vitejs/plugin-vue';
import createCompression from './compression';
import createSetupExtend from './setup-extend';

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createSetupExtend());
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}
