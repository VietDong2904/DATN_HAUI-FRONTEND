import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { AlainConfigService, BooleanInput, InputBoolean } from '@delon/util';
import { BrandService } from '../../pro.service';

@Component({
  selector: 'page-header-wrapper',
  templateUrl: './page-header-wrapper.component.html',
  host: {
    '[class.alain-pro__page-header-wrapper]': 'true',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProPageHeaderWrapperComponent {
  static ngAcceptInputType_loading: BooleanInput;
  static ngAcceptInputType_autoBreadcrumb: BooleanInput;
  static ngAcceptInputType_autoTitle: BooleanInput;
  static ngAcceptInputType_syncTitle: BooleanInput;
  static ngAcceptInputType_noSpacing: BooleanInput;

  // #region page-header fields

  @Input() title?: string | TemplateRef<void>;
  @Input() @InputBoolean() loading = false;
  @Input() home?: string;
  @Input() homeLink?: string;
  @Input() homeI18n?: string;
  @Input() @InputBoolean() autoBreadcrumb = true;
  @Input() @InputBoolean() autoTitle = true;
  @Input() @InputBoolean() syncTitle = true;
  @Input() breadcrumb?: TemplateRef<void>;
  @Input() logo?: TemplateRef<void>;
  @Input() action?: TemplateRef<void>;
  @Input() content?: TemplateRef<void>;
  @Input() extra?: TemplateRef<void>;
  @Input() tab?: TemplateRef<void>;
  @Input() phContent?: TemplateRef<void>;

  @Input() top?: TemplateRef<void>;
  @Input() @InputBoolean() noSpacing = false;
  @Input() style?: {};


  constructor(public pro: BrandService, cog: AlainConfigService) {
    cog.attach(this, 'pageHeader', { syncTitle: true });
  }
}
