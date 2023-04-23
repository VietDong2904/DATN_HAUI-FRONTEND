import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@env/environment';
import { ButtonModel, GridModel } from '@model';
import { CategoryService, ColorService, SupplierService } from '@service';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/electronic-management/product/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.less'],
})
export class ProductItemComponent implements OnInit {
  public Editor = ClassicEditor;
  config = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'Alignment',
      'Autoformat',
      'BlockQuote',
      'CKFinder',
      'CKFinderUploadAdapter',
      'Image',
      'Link',
      'Table',
      'TableToolbar',
      'TextTransformation',
      'MediaEmbed',
    ],
  };
  @Input() type = 'add';
  @Input() item: any;
  @Input() isVisible = false;
  @Input() option: any;
  @Output() eventEmmit = new EventEmitter<any>();
  fileList: NzUploadFile[] = [];
  form: FormGroup;
  grid: GridModel = {
    dataCount: 0,
    rowData: [],
    totalData: 0,
  };
  gridColor: GridModel = {
    dataCount: 0,
    rowData: [],
    totalData: 0,
  };
  listHeader: any[] = [
    {
      key: '1',
      name: 'STT',
    },
    {
      key: '2',
      name: 'Mã Thông tin',
    },
    {
      key: '3',
      name: 'Nội dung',
    },
    {
      key: '4',
      name: 'Trạng thái',
    },
    {
      key: '5',
      name: 'Thao tác',
    },
  ];
  listHeaderColor: any[] = [
    {
      key: '1',
      name: 'STT',
    },
    {
      key: '2',
      name: 'Mã kích thước',
    },
    {
      key: '3',
      name: 'Giá tiền',
    },
    {
      key: '4',
      name: 'Giảm giá',
    },
    {
      key: '5',
      name: 'Trạng thái',
    },
    {
      key: '6',
      name: 'Thao tác',
    },
  ];
  moduleName = 'sản phẩm';
  isInfo = false;
  isEdit = false;
  isAdd = false;
  listCategoryMetaProduct: any[] = [];
  listCategoryMeta: any[] = [];
  listCategorySelected: any[] = [];
  listCategory: any[] = [];
  listTagSelected: any[] = [];
  listTag: any[] = [];
  listColor: any[] = [];
  supplierId = '';
  tittle = '';
  pageIndex = 1;
  pageSize = 5;
  uploadUrl = environment.BASE_UPLOAD_URL;
  parentId = '';
  pageSizeOptions: any[] = [];
  isLoading = false;
  previewImage: string | undefined = '';
  previewVisible = false;
  isReloadGrid = false;
  formatterPercent = (value: number) => `${value} %`;
  btnSave: ButtonModel;
  btnSaveAndCreate: ButtonModel;
  btnCancel: ButtonModel;
  btnEdit: ButtonModel;
  loaiBaoHanh: any;
  constructor(
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private productService: ProductService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
  ) {
    this.btnSave = {
      title: 'Lưu',
      titlei18n: '',
      visible: true,
      enable: true,
      grandAccess: true,
      click: ($event: any) => {
        this.save();
      },
    };
    this.btnSaveAndCreate = {
      title: 'Lưu & Thêm mới',
      titlei18n: '',
      visible: true,
      enable: true,
      grandAccess: true,
      click: ($event: any) => {
        this.save(true);
      },
    };
    this.btnCancel = {
      title: 'Hủy',
      titlei18n: '',
      visible: true,
      enable: true,
      grandAccess: true,
      click: ($event: any) => {
        this.handleCancel();
      },
    };
    this.btnEdit = {
      title: 'Cập nhật',
      titlei18n: '',
      visible: true,
      enable: true,
      grandAccess: true,
      click: ($event: any) => {
        this.updateFormToEdit();
      },
    };
    this.form = this.fb.group({
      code: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      supplier: [null, [Validators.required]],
      title: [null, [Validators.required]],
      serialNumber: [null, [Validators.required]],
      summary: [null, [Validators.required]],
      listTag: [null],
      listCategory: [null],
      thoiGianBaoHanh: [null, [Validators.required]],
      loaiBaoHanh: [null, [Validators.required]],
      description: [null, [Validators.required]],
      status: [true],
    });
  }
  addMeta(event: any) {
    const model = {
      key: '',
      content: '',
      status: true,
      validCategoryMeta: false,
      validContent: false,
    };
    this.grid.rowData.push(model);
  }
  addColor(event: any) {
    const model = {
      sizeId: '',
      price: '',
      discount: '',
      status: true,
      validColor: false,
      validPrice: false,
    };
    this.gridColor.rowData.push(model);
  }
  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  handleCancel(): void {
    this.isVisible = false;
    if (this.isReloadGrid) {
      this.eventEmmit.emit({ type: 'success' });
    } else {
      this.eventEmmit.emit({ type: 'close' });
    }
  }
  listSupplier = [];
  ngOnInit(): void {
    this.initRightOfUser();
  }
  fecthlistSupplier(): void {
    this.supplierService.getListCombobox().subscribe(
      (res: any) => {
        this.isLoading = false;
        const dataResult = res.data;
        this.listSupplier = dataResult;
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      },
    );
  }
  fecthListColor(): void {
    this.colorService.getListCombobox().subscribe(
      (res: any) => {
        this.isLoading = false;
        const dataResult = res.data;
        this.listColor = dataResult;
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      },
    );
  }

  fecthListCateogry(): void {
    this.categoryService.getListCombobox().subscribe(
      (res: any) => {
        this.isLoading = false;
        const dataResult = res.data;
        this.listCategory = dataResult;
      },
      (err: any) => {
        this.isLoading = false;
        console.log(err);
      },
    );
  }
  initRightOfUser(): void {
    // this.btnSave.grandAccess = this.aclService.canAbility('UNIT-CREATE');
    // this.btnEdit.grandAccess = this.aclService.canAbility('UNIT-EDIT');
    // this.btnSaveAndCreate.grandAccess = this.aclService.canAbility('UNIT-CREATE');
  }

  updateFormToEdit(): void {
    this.updateFormType('edit');
    this.form.enable();
    this.form.get('code')?.disable();
  }

  updateFormType(type: string): void {
    switch (type) {
      case 'add':
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.tittle = `Thêm mới ${this.moduleName}`;
        break;
      case 'info':
        this.isInfo = true;
        this.isEdit = false;
        this.isAdd = false;
        this.tittle = `Chi tiết ${this.moduleName}`;
        break;
      case 'edit':
        this.isInfo = false;
        this.isEdit = true;
        this.isAdd = false;
        this.tittle = `Cập nhật ${this.moduleName}`;
        break;
      default:
        this.isInfo = false;
        this.isEdit = false;
        this.isAdd = true;
        this.tittle = `Thêm mới ${this.moduleName}`;
        break;
    }
  }
  btnDeleteClickedHandler(event: any) {
    const indexOfItem = this.grid.rowData.indexOf(event);
    this.grid.rowData.splice(indexOfItem, 1);
  }
  removeColorRow(event: any) {
    const indexOfItem = this.gridColor.rowData.indexOf(event);
    this.gridColor.rowData.splice(indexOfItem, 1);
  }
  public initData(data: any, type: any = null, option: any = {}): void {
    this.fecthlistSupplier();
    this.fecthListColor();
    this.fecthListCateogry();
    this.resetForm();

    this.isLoading = false;
    this.isReloadGrid = false;
    this.item = data;
    this.type = type;
    this.option = option;
    this.updateFormType(type);
    if (this.item.id === null || this.item.id === undefined) {
      this.form = this.fb.group({
        code: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        name: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        title: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        status: [{ value: true, disabled: this.isInfo }],
        listTag: [null],
        listCategory: [null],
        supplier: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        serialNumber: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        summary: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        thoiGianBaoHanh: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        loaiBaoHanh: [{ value: null, disabled: this.isInfo }, [Validators.required]],
        description: [{ value: null, disabled: this.isInfo }, [Validators.required]],
      });
    } else {
      if (this.item.attachments.length > 0) {
        for (let index = 0; index < this.item.attachments.length; index++) {
          this.item.attachments[index];
          let model: NzUploadFile = {
            uid: index.toString(),
            name: this.item.attachments[index],
            status: 'done',
            url: environment.BASE_FILE_URL + this.item.attachments[index],
          };
          this.fileList.push(model);
        }
      }
      this.supplierId = this.item.supplierId;
      this.listCategorySelected = this.item.categories.map((x) => x.id);
      this.grid.rowData = this.item.productMetas;
      this.gridColor.rowData = this.item.productColors;
      this.form = this.fb.group({
        code: [{ value: this.item.code, disabled: true }, [Validators.required]],
        name: [{ value: this.item.name, disabled: this.isInfo }, [Validators.required]],
        status: [{ value: this.item.status, disabled: this.isInfo }],
        listTag: [{ value: this.item.listTag, disabled: this.isInfo }],
        listCategory: [{ value: this.listCategory, disabled: this.isInfo }],
        supplier: [{ value: this.item.supplierId, disabled: this.isInfo }, [Validators.required]],
        title: [{ value: this.item.title, disabled: this.isInfo }, [Validators.required]],
        serialNumber: [{ value: this.item.serialNumber, disabled: this.isInfo }, [Validators.required]],

        summary: [{ value: this.item.summary, disabled: this.isInfo }, [Validators.required]],

        thoiGianBaoHanh: [{ value: this.item.thoiGianBaoHanh, disabled: this.isInfo }, [Validators.required]],
        loaiBaoHanh: [{ value: this.item.loaiBaoHanh, disabled: this.isInfo }, [Validators.required]],
        description: [{ value: this.item.description, disabled: this.isInfo }, [Validators.required]],
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.grid.rowData = [];
    this.gridColor.rowData = [];
    this.fileList = [];
    this.listTagSelected = [];
    this.listCategorySelected = [];
    this.supplierId = '';
    this.loaiBaoHanh = '';
    this.form.get('status')?.setValue(true);
  }
  validCategoryMeta() {
    let flag = false;
    this.grid.rowData.forEach((item) => {
      if (item.key === '' || item.key === null || item.key === undefined) {
        item.validCategoryMeta = true;
        flag = true;
      } else {
        item.validCategoryMeta = false;
        flag = false;
      }

      if (item.content === '' || item.content === null || item.content === undefined) {
        item.validContent = true;
        flag = true;
      } else {
        item.validContent = false;
        flag = false;
      }
    });
    if (flag === false) {
      return true;
    }
    return false;
  }
  validColor() {
    let flag = false;
    this.gridColor.rowData.forEach((item) => {
      if (item.sizeId === '' || item.sizeId === null || item.sizeId === undefined) {
        item.validColor = true;
        flag = true;
      } else {
        item.validColor = false;
        flag = false;
      }

      if (item.price === '' || item.price === null || item.price === undefined) {
        item.validPrice = true;
        flag = true;
      } else {
        item.validPrice = false;
        flag = false;
      }
    });
    if (flag === false) {
      return true;
    }
    return false;
  }
  closeModalReloadData(): void {
    this.isVisible = false;
    this.eventEmmit.emit({ type: 'success' });
  }
  isNotSelectedTag(value: any): boolean {
    return this.listTagSelected.filter((x) => x === value).length <= 0;
  }
  isNotSelectedCategory(value: any): boolean {
    return this.listCategorySelected.filter((x) => x === value).length <= 0;
  }
  save(isCreateAfter: boolean = false): Subscription | undefined {
    this.isLoading = true;
    // tslint:disable-next-line:forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (!this.form.valid) {
      this.isLoading = false;
      this.messageService.error(`Kiểm tra lại thông tin các trường đã nhập!`);
      return;
    }
    if (this.fileList.length === 0) {
      this.isLoading = false;
      this.messageService.error(`Ảnh sản phẩm không được để trống!`);
      return;
    }
    if (this.listCategorySelected.length === 0) {
      this.isLoading = false;
      this.messageService.error(`Loại sản phẩm không được để trống!`);
      return;
    }
    // if (this.grid.rowData.length === 0) {
    //   this.isLoading = false;
    //   this.messageService.error(`Thông tin bổ sung không được để trống!`);
    //   return;
    // }
    if (this.gridColor.rowData.length === 0) {
      this.isLoading = false;
      this.messageService.error(`kích thước không được để trống!`);
      return;
    }
    if (this.validCategoryMeta() === false) {
      this.messageService.error(`Kiểm tra lại thông tin các trường đã nhập!`);
      return;
    }
    let listPictures: any[] = [];
    this.fileList.map((x) => {
      listPictures.push(x.name);
    });
    var categories: any[] = [];
    this.listCategorySelected.map((item) => {
      var model = {
        id: item,
      };
      categories.push(model);
    });
    let data = {
      id: this.item.id,
      name: this.form.controls.name.value,
      code: this.form.controls.code.value,
      status: this.form.controls.status.value,
      supplierId: this.form.controls.supplier.value,
      attachments: listPictures,
      productMetas: this.grid.rowData,
      productColors: this.gridColor.rowData,
      categories: categories,
      title: this.form.controls.title.value,
      serialNumber: this.form.controls.serialNumber.value,
      summary: this.form.controls.summary.value,
      thoiGianBaoHanh: this.form.controls.thoiGianBaoHanh.value,
      loaiBaoHanh: this.form.controls.loaiBaoHanh.value,
      description: this.form.controls.description.value,
    };

    if (this.isAdd) {
      const promise = this.productService.create(data).subscribe(
        (res: any) => {
          this.isLoading = false;
          if (res.code !== 200) {
            this.messageService.error(`${res.message}`);
            return;
          }
          if (res.data === null || res.data === undefined) {
            this.messageService.error(`${res.message}`);
            return;
          }
          const dataResult = res.data;
          this.messageService.success(`${res.message}`);
          this.isReloadGrid = true;
          if (isCreateAfter) {
            this.resetForm();
          } else {
            this.closeModalReloadData();
          }
        },
        (err: any) => {
          this.isLoading = false;
          if (err.error) {
            this.messageService.error(`${err.error.message}`);
          } else {
            this.messageService.error(`${err.status}`);
          }
        },
      );
      return promise;
    } else if (this.isEdit) {
      const promise = this.productService.update(data).subscribe(
        (res: any) => {
          this.isLoading = false;
          if (res.code !== 200) {
            this.messageService.error(`${res.message}`);
            return;
          }
          if (res.data === null || res.data === undefined) {
            this.messageService.error(`${res.message}`);
            return;
          }
          const dataResult = res.data;
          this.messageService.success(`${res.message}`);
          this.closeModalReloadData();
        },
        (err: any) => {
          this.isLoading = false;
          if (err.error) {
            this.messageService.error(`${err.error.message}`);
          } else {
            this.messageService.error(`${err.status}`);
          }
        },
      );
      return promise;
    } else {
      return;
    }
  }
}
