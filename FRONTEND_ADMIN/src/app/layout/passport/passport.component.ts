import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';
import { environment } from '@env/environment';
@Component({
  selector: 'layout-passport',
  templateUrl: './passport.component.html',
  styleUrls: ['./passport.component.less'],
})
export class LayoutPassportComponent {
  app: any;
  feUrl = environment.FE_URL;
  constructor(private settingService: SettingsService) {
    this.app = this.settingService.getData('app');
  }
  get year(): number {
    return new Date().getFullYear();
  }
  links = [];
}
