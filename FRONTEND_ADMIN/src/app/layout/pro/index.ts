export * from './pro.types';
export * from './pro.service';

import { ProSettingDrawerComponent } from './setting-drawer/setting-drawer.component';
import { LayoutThemeBtnComponent } from './theme-btn/theme-btn.component';

export const PRO_ENTRYCOMPONENTS = [ProSettingDrawerComponent, LayoutThemeBtnComponent];

export const PRO_COMPONENTS = [
  ...PRO_ENTRYCOMPONENTS,
]