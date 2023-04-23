import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ACLService } from '@delon/acl';
import { DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { AuthenticationApiService } from '@service';
import { ROLE_SYS_ADMIN } from '@util';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    public authenticationApiService: AuthenticationApiService,
    private aclService: ACLService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
  }

  // #region fields

  get userName(): AbstractControl {
    return this.form.controls.userName;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  get remember(): AbstractControl {
    return this.form.controls.remember;
  }
  get mobile(): AbstractControl {
    return this.form.controls.mobile;
  }
  get captcha(): AbstractControl {
    return this.form.controls.captcha;
  }
  form: FormGroup;
  error = '';
  type = 0;
  isLoading = false;
  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch({ index }: { index: number }): void {
    this.type = index;
  }

  getCaptcha(): void {
    if (this.mobile.invalid) {
      this.mobile.markAsDirty({ onlySelf: true });
      this.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.count = 59;
    this.interval$ = setInterval(() => {
      this.count -= 1;
      if (this.count <= 0) {
        clearInterval(this.interval$);
      }
    }, 1000);
  }

  // #endregion

  submit() {
    this.isLoading = true;
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || this.captcha.invalid) {
        return;
      }
    }

    this.authenticationApiService
      .login({
        username: this.userName.value,
        password: this.password.value,
        rememberMe: this.remember.value,
      })
      .subscribe(
        (res: any) => {
          this.isLoading = false;

          if (res.code !== 200) {
            this.error = res.message;
            return;
          }
          if (res.data === null || res.data === undefined) {
            this.error = res.message;
            return;
          }
          if (res.data.userModel === null) {
            this.error = res.message;
            return;
          }

          // Clear route reuse information
          this.reuseTabService.clear();

          const isSysAdmin =
            res.data.userModel?.listRoles === null || res.data.userModel?.listRoles === undefined
              ? false
              : res.data.userModel?.listRoles.includes(ROLE_SYS_ADMIN);
          // Set user token information
          this.tokenService.set({
            id: res.data.userModel.userId,
            avatar: res.data.userModel?.avatar,
            token: res.data.tokenString,
            email: res.data.userModel.email,
            avatarUrl: res.data.userModel.avatarUrl,
            name: res.data.userModel.name,
            username: res.data.userModel.username,
            // isSysAdmin,
          });
          const userModel = {
            name: res.data.userModel?.name,
            avatar: res.data.userModel?.avatar,
            email: res.data.userModel?.email,
          };

          this.settingsService.setUser(userModel);

          // Retrieving StartupService content,
          // we always believe that application information will generally be affected by the scope of the current user authorization
          this.startupSrv.load().then(() => {
            let url = this.tokenService.referrer?.url || '/';
            if (url.includes('/passport')) {
              url = '/';
            }
            if (isSysAdmin) {
              this.msg.success('Đăng nhập thành công');
              this.router.navigateByUrl('/dashboard');
            } else {
              this.error = 'Không có quyền truy cập';
            }
          });
        },
        (error: any) => {
          this.isLoading = false;
          this.error = 'Sai tên đăng nhập hoặc mật khẩu';
        },
      );
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
