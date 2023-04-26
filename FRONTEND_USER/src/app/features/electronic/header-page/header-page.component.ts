import { Component, Inject, OnInit } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'src/app/services/electronic-management/account.service';
import { CartService, CategoryService } from 'src/app/services';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/electronic-management/product/product.service';
import { environment } from 'src/environments/environment';
import { PAGESIZE_MAX_VALUE } from 'src/app/utils';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css'],
  providers: [DialogService]
})
export class HeaderPageComponent implements OnInit {
  user: any;
  isLogin = false;
  listCart: any[] = [];
  listProd: any[] = [];
  data: any[] = [];
  textSearch = '';
  isChangeText = false;
  isLoadingFilter = false;
  total = 0;
  displaySearchResult: boolean = true
  sub1: Subscription;
  baseFile = environment.BASE_FILE_URL;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private dialogService: DialogService,
    private cartService:CartService,
    private productService: ProductService,
    private categoryService: CategoryService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,

  ){
    this.sub1 = this.cartService.currentCart.subscribe((res) => {
      this.total = 0;
      this.listCart = res != null ? res : [];
      this.listCart.map((item) => {
        item.subTotal = item.count * (item.amoutDefault - item.discountDefault);
        this.total = this.total + item.subTotal;
      });
    });
  }

  ngOnInit(): void {
    this.accountService.isLoginCurrent.subscribe((res) => {
      this.isLogin = res;
      if (res) {
        this.user = JSON.parse(localStorage.getItem('user') || '');
        this.cartService.getById().subscribe(res => {
          if (res.code === 200) {
            this.listCart = res.data;
            this.cartService.changeCart(this.listCart);
          }
        });
      }
    });
    this.fetchlistCategory();

  }

  changeText() {
    this.isChangeText = true;
    var filter = {
      textSearch: this.textSearch,
      pageSize: PAGESIZE_MAX_VALUE,
      pageNumber: 1
    }
    this.fetchListProduct(filter);
    if (
      this.textSearch === '' ||
      this.textSearch === undefined ||
      this.textSearch === null
    ) {
      this.isChangeText = false;
    }
  }
  enterSearch() {
    this.router.navigateByUrl('shop?textSearch=' + this.textSearch);
    this.isChangeText = false
  }

  redirectSearch(id: any, type: any) {
    switch (type) {
      case 1:
        this.router.navigateByUrl('/shop?categoryId=' + id);
        break;
      case 2:
        this.router.navigateByUrl('/shop?supplierId=' + id);
        break;
      default:
        break;
    }
  }
  sidebarVisible2: boolean = false
  fetchListProduct(filter: any): void {
    this.productService.getFilter(filter).subscribe((res: any) => {
      if (res.code !== 200) {
        return;
      }
      if (res.data === null || res.data === undefined) {
        return;
      }
      this.listProd = res.data.data;
      this.listProd.map(prod => {
        prod.precentDiscount = Math.round((prod.discountDefault/prod.amoutDefault)*100);
        
        prod.urlImageActive = this.baseFile + prod.attachments[0];
      });
    });
  }

  fetchlistCategory(): void {
    this.categoryService.getListCombobox().subscribe(
      (res: any) => {
        const dataResult = res.data;
        this.data = dataResult;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  showCart() {
    this.sidebarVisible2 = !this.sidebarVisible2

  }

  viewDetail(code: any) {
    this.sidebarVisible2 = false
    this.router.navigate(['/product-detail/' + code]);
    this.isChangeText = false
  }

  changeCount(event: any, prod: any) {
    const rs = this.cartService.change(event, prod, this.listCart);
    this.listCart = rs.listCart;
    this.total = rs.total;
  }

  removeItem(item: any) {
    this.listCart = this.cartService.removeItem(item, this.listCart);
  }

  logout() {
    this.accountService.changeLogin(false);
    localStorage.removeItem('user');
    this.tokenService.clear();
    this.router.navigateByUrl('');
    this.listCart = [];
  }
  
  SignIn() {
    this.dialogService.open(LoginPageComponent, {
      header: "Sign in/ Sign up",
      width: "40%",
      data: {
      }
    });
  }
  
}
