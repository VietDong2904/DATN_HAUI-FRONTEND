import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';

export const STWIDGET_COMPONENTS = [];

@NgModule({
  declarations: STWIDGET_COMPONENTS,
  imports: [SharedModule],
  exports: [...STWIDGET_COMPONENTS],
})
export class STWidgetModule {
}
