import component from './zh-CN/component';
// import globalHeader from './zh-CN/globalHeader';
import logs from './zh-CN/logs';
import menu from './zh-CN/menu';
import pages from './zh-CN/pages';
// import pwa from './zh-CN/pwa';
import settingDrawer from './zh-CN/settingDrawer';
import wallet from './zh-CN/wallet';
import common from './zh-CN/common';
import raydium from './zh-CN/raydium';

export default {
  key: 'zh-CN',
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...raydium,
  // ...globalHeader,
  ...menu,
  ...settingDrawer,
  // ...pwa,
  ...component,
  ...wallet,
  ...logs,
  ...common,
};
