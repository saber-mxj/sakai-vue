import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    // eslint-disable-next-line no-undef
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild
  });
}
