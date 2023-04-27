import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { NzButtonType } from 'ng-zorro-antd/button';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartService } from 'src/app/services';
import { ProductReviewService } from 'src/app/services/electronic-management/product-review/product-review.service';
import { ProductService } from 'src/app/services/electronic-management/product/product.service';
import { environment } from 'src/environments/environment';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ArrayService } from '@delon/util';
import { formatDistance } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { MessageService } from 'primeng/api';
declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  likes = 0;
  dislikes = 0;
  time = formatDistance(new Date(), new Date());

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }
  danger:NzButtonType = 'primary';
  pageSizes = 10;
  pageSizeSimilar = 10;
  isLoading = true;
  pageIndex = 1;
  pageIndexSimilar = 1;
  pageMetadataIndex = 1;
  pageMetadataSize = 2;
  inputReview = '';
  snapshot: RouterStateSnapshot;
  userInfo: any = {};
  urlComment = '';
  myThumbnail: any;
  itemQuickView: any = {};
  tooltips = ['Cực tệ', 'Tệ', 'Trung bình', 'Tốt', 'Tuyệt vời'];
  value = 5;
  listProductSimilar: any[] = [];
  token: any;
  inputValue = '';
  baseFile = environment.BASE_FILE_URL;
  listSize: any = []
  chooseSize: boolean = false

  constructor(
    private productService: ProductService,
    private arrayService: ArrayService,
    private route: ActivatedRoute,
    private nzI18n: NzI18nService,
    private prodReviewService: ProductReviewService,
    private nzMessage: NzMessageService,
    private messageService: MessageService,
    private cartCusService: CartService,
    private prodService: ProductService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.fetchData();
  }

  fetchData(code?: string) {
    const state: RouterState = this.router.routerState;
    this.snapshot = state.snapshot;
    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.userInfo.avatar) {
      let urlCheck = this.userInfo.avatar.slice(0, 4);
      if (urlCheck === 'http') {
        this.userInfo.avatar = this.userInfo.avatar;
      } else {
        this.userInfo.avatar = environment.BASE_FILE_URL + this.userInfo.avatar;
      }
    }
    this.token = this.tokenService.get()?.token;
    code = code ?? this.route.snapshot.paramMap.get('id');
    this.urlComment = environment.FE_URL + '/product-detail/' + code;
    this.fetchProductByCode(code ? code : '');
    this.fetchListSimilar(code ? code : '');
  }
  listCateMeta: any[] = [];

  viewDetail(code: any) {
    // this.router.navigate(['/product-detail/' + code]);
    this.fetchData(code);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  pageSize = 4;
  getListProdActive(list: any[]) {
    return list.slice(0, 6);
  }
  getListProdRs(list: any[]) {
    let listRs: any = [];
    for (let index = 2; index <= list.length; index++) {
      const model = list.slice((index - 1) * 6, index * 6);
      if (model.length !== 0) {
        listRs.push(model);
      }
    }
    return listRs;
  }
  getListPicActive(list: any[]) {
    return list.slice(0, this.pageSize);
  }
  getListPicdRs(list: any[]) {
    let listRs: any = [];
    for (let index = 2; index <= list.length; index++) {
      const model = list.slice((index - 1) * this.pageSize, index * this.pageSize);
      if (model.length !== 0) {
        listRs.push(model);
      }
    }
    return listRs;
  }
  
  fetchProductByCode(code: string) {
    if (code) {
      this.prodService.getById(code).subscribe(
        (res) => {
          this.isLoading = false;
          this.itemQuickView = res.data;
          this.itemQuickView.count = 1;
          if (this.itemQuickView.discountDefault === 0) {
            this.itemQuickView.isShow = false;
            this.itemQuickView.cssClass = 'text-price-discount';
          } else {
            this.itemQuickView.isShow = true;
            this.itemQuickView.cssClass = 'text-price';
          }
          console.log(this.itemQuickView);
          this.listSize = this.itemQuickView.productColors
          
          this.fetchListProdReview();
          this.myThumbnail = this.baseFile + this.itemQuickView.attachments[0];
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }
  changeImage(item:any){
    this.myThumbnail = this.baseFile + item;
  }
  listSimilarActive: any[] = [];
  listSimilarRs: any[] = [];
  fetchListSimilar(code: string) {
    if (code) {
      this.prodService.getListSimilar(code).subscribe(
        (res) => {
          if (res.code === 200) {
            res.data.map((item:any, index:number) => {
              if (item.id === this.itemQuickView.id) {
                this.listProductSimilar.splice(index, 1);
                return;
              }
            });
            this.listProductSimilar = res.data;
            let listSimilarRs: any[] = [];
            this.listProductSimilar.map((item) => {
              let filter: any;
              this.itemQuickView.categories.map((cate:any) => {
                filter = item.categories.filter((x:any) => x.id === cate.id);
              });
              if (filter.length > 0) {
                listSimilarRs.push(item);
              }
            });
            this.listSimilarActive = listSimilarRs;
            console.log(this.listSimilarActive);
            
          }
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }
 

  changeColor(item:any){
    this.itemQuickView.amoutDefault = item.price;
    this.itemQuickView.discountDefault = item.discount;
    this.itemQuickView.productColors = []
    this.itemQuickView.productColors.push(item)
    this.chooseSize = true;
    $('.pro-size').removeClass('active')
    $(`#size-${item.name}`).addClass('active')
   
  }
  changeImageSimilar(url:any, product:any){
    product.urlImageActive = this.baseFile + url;
  }
  counter(i: number) {
    return new Array(i);
}
  isVisible = false;
  itemSimilarView:any;
  updateVisitCount(prodCode: any, item: any) {
    this.ngAfterViewInit();
    this.isVisible = true;
    this.itemSimilarView = item;
    this.myThumbnail = this.baseFile + item.pictures[0];
    this.itemSimilarView.listPicturesActive = this.getListPicActive(this.itemSimilarView.attachments);
    this.itemSimilarView.listPicturesRs = this.getListPicdRs(this.itemSimilarView.attachments);
    if (prodCode) {
      const model = {
        prodCode: prodCode,
      };
      this.productService.updateVisitCount(model).subscribe((res) => {
        this.itemSimilarView.visitCount = res.data;
      });
    }
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnDestroy(): void {}
  changePicture(item: any) {
    this.myThumbnail = this.baseFile + item;
  }
  addToCart(item: any) {
    console.log(item);
    if(!this.chooseSize) {
      this.messageService.add({  severity: 'warn', summary: 'Warning', detail: 'Choose size please ' });

    }
    else {
      this.cartCusService.addToCart(this.itemQuickView, this.snapshot.url);

    }
  }

  buyNow(item: any) {
    if(!this.chooseSize) {
      this.messageService.add({  severity: 'warn', summary: 'Warning', detail: 'Choose size please ' });

    }
    else {
      this.cartCusService.addToCart(this.itemQuickView, this.snapshot.url);

      this.router.navigate(['/checkout'])
    }
  }

  createFbSdk() {
    (function (d, s, id, idBefore) {
      let js,
        fjs = d.getElementsByTagName(s)[3];
      // for (let index = 0; index < fjs.length; index++) {
      //   console.log(index + ' ' + fjs[index].outerHTML);
      // }
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      //js.setAttribute('src', 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=538207577975744&autoLogAppEvents=1');
      // js.src = '//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=253504385800401&autoLogAppEvents=1';
      // Notice the "!" at the end of line
      fjs.nodeName; // <- error!

      if (fjs === null) {
        alert('oops');
      } else {
        // since you've done the nullable check
        // TS won't complain from this point on
        fjs.parentNode?.insertBefore(js, fjs); // <- no error
      }
    })(document, 'script', 'facebook-js-sdk', 'facebook-jssdk');
  }
  ngOnInit(): void {
    this.createFbSdk();
  }
  listProdReview: any[] = [];
  listRs: any[] = [];
  fetchListProdReview(commentId = null) {
    this.listRs = [];
    this.prodReviewService.getById(this.itemQuickView.id).subscribe((res) => {
      if (res.code === 200) {
        const data = res.data;
        this.listProdReview = res.data;
        const arrayTreeResult = data.map((item: any, i: number, arr: any[]) => {
          item.isQtv = false;
          if (item.avatarUrl) {
            let urlCheck = item.avatarUrl.slice(0, 4);
            if (urlCheck === 'http') {
              item.avatar = item.avatarUrl;
            } else {
              item.avatarUrl = environment.BASE_FILE_URL + item.avatarUrl;
            }
          }
          const checkIsLeft = arr.some((c) => c.parentId === item.id);
          if (item.userId === this.userInfo.id) {
            if (this.userInfo.isQtv === true) {
              item.isQtv = true;
            }
          }
          return {
            id: item.id,
            parent_id: item.parentId,
            userName: item.userName,
            code: item.code,
            avatarUrl: item.avatarUrl,
            checked: false,
            isQtv: item.isQtv,
            content: item.content,
            createdDate: formatDistanceToNow(new Date(item.createdDate) as Date, { locale: this.nzI18n.getDateLocale() }),
            rating: item.rating,
            status: item.status,
            userId: item.userId,
            isLeaf: !checkIsLeft,
          };
        });
        const l = this.arrayService.arrToTreeNode(arrayTreeResult, {
          cb: (item, parent, deep) => {
            if (commentId !== null) {
              if (item.id === commentId) {
                item.checked = true;
              }
            }
            if (deep === 1) {
              item.isRoot = true;
              this.listRs.push(item);
            } else {
              item.isRoot = false;
            }
          },
        });
      }
    });
  }

  submitComment(parentId = null, type: any) {
    const token = this.tokenService.get()?.token;
    console.log(this.inputReview);
    
    if (token) {
      let model: any;
      switch (type) {
        case 1:
          if (this.inputReview === '' || this.inputReview === undefined || this.inputReview === null) {
            this.messageService.add({  severity: 'warn', summary: 'Warning', detail: 'Fill your comment, please!' });

            // this.nzMessage.error('Bạn hãy nhập bình luận nhé <3');
            return;
          }
          model = {
            productId: this.itemQuickView.id,
            productName: this.itemQuickView.name,
            userId: this.userInfo.id,
            avatarUrl: this.userInfo.avatar,
            rating: this.value,
            isRating: true,
            status: true,
            content: this.inputReview,
          };
          break;
        case 2:
          if (this.inputValue === '' || this.inputValue === undefined || this.inputValue === null) {
            this.messageService.add({  severity: 'warn', summary: 'Warning', detail: 'Fill your comment, please!' });

            return;
          }
          model = {
            productId: this.itemQuickView.id,
            productName: this.itemQuickView.name,
            userId: this.userInfo.id,
            avatarUrl: this.userInfo.avatar,
            rating: this.value,
            isRating: false,
            status: true,
            content: this.inputValue,
          };
          break;
        default:
          break;
      }
      if (parentId !== null) {
        Object.assign(model, { parentId: parentId });
      }
      this.prodReviewService.create(model).subscribe(
        (res) => {
          if (res.code === 200) {
            if (type === 1) {
              this.messageService.add({  severity: 'success', summary: 'Success', detail: 'Thanks for reviewing. Have a nice day!' });

            }
            this.fetchListProdReview();
            this.inputValue = '';
            this.inputReview = '';
          }
        },
        (err) => {
          this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Have some error ocurs: '+ err.error.message });
        },
      );
    } else {
      this.messageService.add({  severity: 'error', summary: 'Error', detail: 'Login to comment' });

      return;
    }
  }
  openReply(id: any) {
    this.listRs = [];
    const arrayTreeResult = this.listProdReview.map((item: any, i: number, arr: any[]) => {
      const checkIsLeft = arr.some((c) => c.parentId === item.id);

      return {
        id: item.id,
        parent_id: item.parentId,
        userName: item.userName,
        code: item.code,
        avatarUrl: item.avatarUrl,
        checked: false,
        content: item.content,
        isQtv: item.isQtv,
        createdDate: formatDistanceToNow(new Date(item.createdDate) as Date, { locale: this.nzI18n.getDateLocale() }),
        rating: item.rating,
        status: item.status,
        userId: item.userId,
        isLeaf: !checkIsLeft,
      };
    });
    const l = this.arrayService.arrToTreeNode(arrayTreeResult, {
      cb: (item, parent, deep) => {
        if (id !== null) {
          if (item.id === id) {
            item.checked = true;
          }
        }
        if (deep === 1) {
          item.isRoot = true;
          this.listRs.push(item);
        } else {
          item.isRoot = false;
        }
      },
    });
  }

  handleClose(id: any) {
    this.listRs = [];
    const arrayTreeResult = this.listProdReview.map((item: any, i: number, arr: any[]) => {
      const checkIsLeft = arr.some((c) => c.parentId === item.id);
      return {
        id: item.id,
        parent_id: item.parentId,
        userName: item.userName,
        code: item.code,
        avatarUrl: item.avatarUrl,
        checked: false,
        content: item.content,
        isQtv: item.isQtv,
        createdDate: formatDistanceToNow(new Date(item.createdDate) as Date, { locale: this.nzI18n.getDateLocale() }),
        rating: item.rating,
        status: item.status,
        userId: item.userId,
        isLeaf: !checkIsLeft,
      };
    });
    const l = this.arrayService.arrToTreeNode(arrayTreeResult, {
      cb: (item, parent, deep) => {
        if (id !== null) {
          if (item.id === id) {
            item.checked = false;
          }
        }
        if (deep === 1) {
          item.isRoot = true;
          this.listRs.push(item);
        } else {
          item.isRoot = false;
        }
      },
    });
  }
  ngAfterViewInit() {}
}
