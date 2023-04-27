import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { CartService, CategoryService, ColorService, SupplierService } from 'src/app/services';
import { ProductService } from 'src/app/services/electronic-management/product/product.service';
import { LIST_SORT_TYPE, PAGE_SIZE_OPTION_DEFAULT } from 'src/app/utils';
import { environment } from 'src/environments/environment';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent {
  listPageSizeDf = PAGE_SIZE_OPTION_DEFAULT;
  pageNumber = 1;
  sortType = 0;
  pageSize = 8;
  totalCount = 0;
  listSortType = LIST_SORT_TYPE;
  baseFile = environment.BASE_FILE_URL;
  max: any;
  snapshot: RouterStateSnapshot;
  filter: any = {};
  listProduct: any[] = [];
  listSize: any[] = [];
  listSuplier: any[] = [];
  min: any;
  nodes: NzTreeNodeOptions[] = [];
  textSearch = '';
  listRangeChange: any[] = [0, 0];
  formatterCurrency = (value: number) =>
    `${
      value ? value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') : 0
    }đ`;
  range: any[] = [0, 0];
  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private suplierService: SupplierService,
    private cartCusService:CartService,
    private sizeService:ColorService,
    private router: Router,
  ) {
    activeRoute.queryParams.subscribe((res) => {
      this.textSearch = res['textSearch'];
      this.filter.textSearch = res['textSearch'];
      this.filter.categoryId = res['categoryId'];
      this.filter.supplierId = res['supplierId'];
      this.filter.pageNumber = this.pageNumber;
      this.filter.pageSize = this.pageSize;
      this.fetchListProduct(this.filter);
    });
    const state: RouterState = router.routerState;
    this.snapshot = state.snapshot;
  }
  treeViewClick(event: any) {
    const ts = event.node._title;
    this.filter.supplierId = null;
    this.filter.categoryId = event.keys[0];
    this.fetchListProduct(this.filter);
  }
  viewDetail(id: any) {
    const url = '/product-detail/' + id;
    this.router.navigate(['/product-detail/' + id]);
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  counter(i: number) {
    return new Array(i);
}
  ngOnInit(): void {
    this.fecthlistCategory();
    this.fecthlistSuplier();
    this.fecthlistSize();
    this.filter.textSearch = this.textSearch;
    this.filter.pageNumber = this.pageNumber;
    this.filter.pageSize = this.pageSize;
    this.fetchListProduct(this.filter);
  }
  changeSlider(event: any) {
    this.listRangeChange = event;
  }
  filterHandler(type: any = 1, event: any = 0) {
    this.filter.sortType = event;
    this.fetchListProduct(this.filter);
  }
  changePageSize(event: any) {
    this.filter.pageSize = event;
    this.fetchListProduct(this.filter);
  }
  changePageIndex() {
    this.filter.pageNumber = this.pageNumber;
    this.fetchListProduct(this.filter);
  }
  fecthlistCategory(): void {
    this.categoryService.getListCombobox().subscribe(
      (res: any) => {
        const dataResult: any[] = res.data;
        this.nodes = dataResult;
        
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  fecthlistSize(): void {
    this.sizeService.getListCombobox().subscribe(
      (res: any) => {
        const dataResult: any[] = res.data;
        this.listSize = dataResult;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  fecthlistSuplier(): void {
    this.suplierService.getListCombobox().subscribe(
      (res: any) => {
        const dataResult: any[] = res.data;
        dataResult.forEach(item =>{
          item.selected = false;
        })
        this.listSuplier = dataResult;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
  resetFilter(){
    this.filter = {};
    this.filter.pageNumber = this.pageNumber;
    this.filter.pageSize = this.pageSize;
    this.fetchListProduct(this.filter);
  }
  searchBySuplier(item: any){
    this.filter.supplierId = item.id;
    this.fetchListProduct(this.filter);
  }
  searchBySize(item: any){
    this.filter.sizeId = item.id;
    this.fetchListProduct(this.filter);
  }
  changeImage(url:any, product:any){
    product.urlImageActive = this.baseFile + url;
  }
  addToCart(item: any) {
    this.cartCusService.addToCart(item, this.snapshot.url);
  }
  fetchListProduct(filter: any): void {
    this.productService.getFilter(filter).subscribe((res: any) => {
      if (res.code !== 200) {
        return;
      }
      if (res.data === null || res.data === undefined) {
        return;
      }
      this.listProduct = res.data.data;
      this.listProduct.map(prod => {
        prod.precentDiscount = Math.round((prod.discountDefault/prod.amoutDefault)*100);
        
        prod.urlImageActive = this.baseFile + prod.attachments[0];
      });
      this.totalCount = res.data.totalCount;
      console.log(this.totalCount);
      
    });
  }
}
