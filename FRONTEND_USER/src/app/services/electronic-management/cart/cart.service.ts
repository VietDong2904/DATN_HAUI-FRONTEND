import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

import { environment } from 'src/environments/environment';

import { cartRouter } from 'src/app/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
// RxJS
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient,
    private messageService: MessageService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private router: Router,
    private nzMessage: NzMessageService,) {}
  private listCartSource = new BehaviorSubject([]);
  currentCart = this.listCartSource.asObservable();
  changeCart(listCart: any) {
    this.listCartSource.next(listCart);
  }
update(model: any): Observable<any> {
    return this.http.put(environment.BASE_API_URL + cartRouter.update, model);
  }

  getById(): Observable<any> {
    return this.http.get(environment.BASE_API_URL + cartRouter.getById);
  }

  delete(list: [string]): Observable<any> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: list,
    };
    return this.http.request('delete', environment.BASE_API_URL + cartRouter.delete, option);
  }
  removeItem(item: any, listCart: any[]) {
    const index = listCart.indexOf(item);
    listCart.splice(index, 1);
    // localStorage.setItem('list-cart', JSON.stringify(listCart));
    this.changeCart(listCart);
    const cartModel = {
      listProducts: JSON.stringify(listCart),
    };
    this.changeCart(listCart);
    this.update(cartModel).subscribe((res) => {
      if (res.code === 200) {
        this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Update cart success' });
      } else {
        this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Update cart unsuccess' });
      }
    });
    return listCart;
  }
  change(event: any, prod: any, listCart: any[]) {
    let total = 0;
    listCart.map((item) => {
      if (item.id === prod.id) {
        item.count = event;
      }
    });
    listCart.map((item) => {
      item.subTotal = item.count * (item.amoutDefault - item.discountDefault);
      total = total + item.subTotal;
    });
    // localStorage.setItem('list-cart', JSON.stringify(listCart));
    this.changeCart(listCart);
    const cartModel = {
      listProducts: JSON.stringify(listCart),
    };
    this.update(cartModel).subscribe((res) => {
      if (res.code === 200) {
        this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Update cart success' });
      } else {
        this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Update cart unsuccess' });
      }
    });
    const modelReturn = {
      total: total,
      listCart: listCart,
    };
    return modelReturn;
  }
  addToCart(item: any, url: any) {
    const token = this.tokenService.get()?.token;
    console.log(token);
    
    if (token) {
      this.getById().subscribe((res) => {
        if (res.code === 200) {
          const listCart = res.data !== null ? res.data : [];
          if (listCart.length > 0) {
            let flag = 0;
            listCart.forEach((c: any) => {
              if (c.id === item.id && c.productColors[0].name === item.productColors[0].name) {
                c.count++;
                flag = 1;
              }
            });
            if (flag === 0) {
              //item.count = 1;
              listCart.push(item);
            }
          } else {
            //item.count = 1;
            listCart.push(item);
          }
          const cartModel = {
            listProducts: JSON.stringify(listCart),
          };
          this.update(cartModel).subscribe((res) => {
            if (res.code === 200) {
              this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Added product to cart' });
            } else {
              this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Something wrong' });
            }
          });
          this.changeCart(listCart);
        }
      });
    } else {
      this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Please log in to continute' });
      this.router.navigate(['/login']);
    }
  }
}
