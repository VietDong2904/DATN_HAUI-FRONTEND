import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ROLE_USER } from 'src/app/utils';
import { NzI18nService, vi_VN } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AccountService } from 'src/app/services/electronic-management/account.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
declare var $: any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],

})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup;
  formRegister: FormGroup;
  formSignUp: FormGroup;
  isLoginErr = false;
  isSignupErr = false;
  isSignupSuccess = false;
  errorMsg = '';
  Date: Date

  public passwordTextTypeLogin!: boolean;
  public passwordTextTypeRegister!: boolean;
  isLogin = false;
  returnUrl!: string;
  siteKey: string = "6Lerft8gAAAAAGMh4wmSQR7oPqOV2wvLJhE1KOc8"
  constructor(
    private fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private nzMessage: NzMessageService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private ref: DynamicDialogRef,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    this.formLogin = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.formSignUp = fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      name: [null, [Validators.required]],
      agree: [false, [Validators.required]],
      rememberMe: [true],
    });
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get userName(): AbstractControl {
    return this.formLogin.controls['username'];
  }
  get password(): AbstractControl {
    return this.formLogin.controls['password'];
  }
  userId: string
  ngOnInit(): void {
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // if(userInfo?.token!=null) {
    //   this.router.navigateByUrl("/login")
    // }
  }
  togglePasswordTextTypeLogin(event) {
    this.passwordTextTypeLogin = !this.passwordTextTypeLogin;
    this.cdr.detectChanges();
  }

  togglePasswordTextTypeRegister(event) {
    this.passwordTextTypeRegister = !this.passwordTextTypeRegister;
    this.cdr.detectChanges();
  }

  login() {
    var model = {
      username: this.userName.value,
      password: this.password.value,
    };
    this.accountService.login(model).subscribe((res) => {
      this.isLoginErr = false;
      if (res.code != 200) {
        this.isLoginErr = true;
        this.errorMsg = res.message;
        this.messageService.add({  severity: 'error', summary: 'Error', detail: `${this.errorMsg}` });
        return;
      }
      var data = res.data.userModel;
      this.isLoginErr = false;
      const isUser =
        data?.listRoles === null || data?.listRoles === undefined
          ? false
          : data?.listRoles.includes(ROLE_USER);
      if (isUser) {
        var model = {
          id: res.data.userModel.id,
          avatar: res.data.userModel?.avatar,
          token: res.data.tokenString,
          email: res.data.userModel.email,
          avatarUrl: res.data.userModel.avatarUrl,
          name: res.data.userModel.name,
          username: res.data.userModel.username,
        };
        this.tokenService.set(model);
        localStorage.setItem('user', JSON.stringify(model));
        this.accountService.changeLogin(true);
        $('#signin-modal').modal('hide');
        this.ref.close()
      } else {
        this.isLoginErr = true;
        this.errorMsg = 'Không có quyền truy cập';
        console.log("loi")
        this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Dont have permission to log in' });
      }
    });
  }

  register() {
    for (const i in this.formSignUp.controls) {
      this.formSignUp.controls[i].markAsDirty();
      this.formSignUp.controls[i].updateValueAndValidity();
      if (this.formSignUp.controls[i].invalid) {
        console.log(this.formSignUp.controls[i]);
        
      }
    }
    if (this.formSignUp.invalid) {
      this.errorMsg = 'Kiểm tra thông tin các trường đã nhập';
      this.isSignupErr = true;
      return;
    }
    this.isSignupErr = false;
    let model = {
      name: this.formSignUp.controls['name'].value,
      username: this.formSignUp.controls['username'].value,
      password: this.formSignUp.controls['password'].value,
      email: this.formSignUp.controls['email'].value,
      phone: this.formSignUp.controls['phoneNumber'].value,
      sex: this.formSignUp.controls['sex'].value,
    };
    this.accountService.register(model).subscribe(
      (res) => {
        if (res.code !== 200) {
          this.isSignupErr = true;
          this.errorMsg = res.message;
          return
        }
        if (res.code === 200) {
          this.isSignupErr = false;
          this.isSignupSuccess = true;
          this.errorMsg = 'Sign up success';
          $("#signin-tab").addClass("active");
          $("#register-tab").removeClass("active");
          $("#signin").addClass("show");
          $("#signin").addClass("active");
          $("#register").removeClass("active");
          $("#register").removeClass("show");
          setTimeout(() => {
            this.isSignupSuccess = false;
          }, 5000);
        this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Sign up was successfull' });
          this.ref.close()
        }
      },
      (err) => {
        this.messageService.add({  severity: 'error', summary: 'Error', detail: `${this.errorMsg}` });
      },
    );
  }
 
}
