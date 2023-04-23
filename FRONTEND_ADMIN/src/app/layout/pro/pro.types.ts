import { Layout } from '@delon/theme';

export type ProLayoutTheme = 'light' | 'dark';
export type ProLayoutMenu = 'side' | 'top';
export type ProLayoutContentWidth = 'fluid' | 'fixed';

export interface ProLayout extends Layout {
  theme: ProLayoutTheme;
  menu: ProLayoutMenu;
  contentWidth: ProLayoutContentWidth;
  fixedHeader: boolean;
  autoHideHeader: boolean;
  fixSiderbar: boolean;
  onlyIcon: boolean;
  colorWeak: boolean;
}
