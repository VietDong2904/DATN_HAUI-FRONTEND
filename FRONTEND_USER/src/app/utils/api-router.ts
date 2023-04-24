export const authenticationRouter = {
    getToken: `api/v1/account/login`,
  };
  export const navigationRouter = {
    getNavigationOwner: `api/v1/bsd/navigations/owner`,
  };
  
  export const nodeUploadRouter = {
    uploadFileBlobPhysical: `api/v1/core/nodes/upload/physical/blob`,
  };
  export const socialAuthenticationRouter = {
    authenticate: `api/v1/social-authentication?_allow_anonymous=true`,
  };
  export const unitRouter = {
    create: `api/v1/res/unit`,
    createMany: `api/v1/res/unit/create-many`,
    update: `api/v1/res/unit`,
    delete: `api/v1/res/unit`,
    getById: `api/v1/res/unit?id=`,
    getFilter: `api/v1/res/unit/filter`,
    getAll: `api/v1/res/unit/all`,
    getListCombobox: `api/v1/res/unit/for-combobox`,
  };
  export const categoryRouter = {
    create: `api/v1/category`,
    update: `api/v1/category`,
    delete: `api/v1/category`,
    getById: `api/v1/category?id=`,
    getFilter: `api/v1/category/filter`,
    getListCombobox: `api/v1/category/for-combobox`,
  };
  export const categoryMetaRouter = {
    create: `api/v1/role`,
    createMany: `api/v1/role/create-many`,
    update: `api/v1/role`,
    delete: `api/v1/role`,
    getById: `api/v1/role?id=`,
    getFilter: `api/v1/role/filter`,
    getAll: `api/v1/role/all`,
    getListCombobox: `api/v1/role/for-combobox`,
  };
  export const colorRouter = {
    create: `api/v1/color`,
    createMany: `api/v1/color/create-many`,
    update: `api/v1/color`,
    delete: `api/v1/color`,
    getById: `api/v1/color?id=`,
    getFilter: `api/v1/color/filter`,
    getAll: `api/v1/color/all`,
    getListCombobox: `api/v1/color/for-combobox`,
  };
  export const supplierRouter = {
    create: `api/v1/supplier`,
    createMany: `api/v1/supplier/create-many`,
    update: `api/v1/supplier`,
    delete: `api/v1/supplier`,
    getById: `api/v1/supplier?id=`,
    getFilter: `api/v1/supplier/filter`,
    getAll: `api/v1/supplier/all`,
    getListCombobox: `api/v1/supplier/for-combobox`,
  };
  export const voucherRouter = {
    create: `api/v1/voucher`,
    createMany: `api/v1/voucher/create-many`,
    update: `api/v1/voucher`,
    delete: `api/v1/voucher`,
    getById: `api/v1/voucher?id=`,
    getFilter: `api/v1/voucher/filter`,
    getAll: `api/v1/voucher/all`,
    getListCombobox: `api/v1/voucher/for-combobox`,
  };
  export const baseAddressRouter = {
    city: `api/v1/address/city`,
    district: `api/v1/address/district?matp=`,
    commune: `api/v1/address/commune?maqh=`,
  };
  export const notifyRouter = {
    getAll: `api/v1/notification`,
    update: `api/v1/notification/update`,
  };
  export const dashboardRouter = {
    getAll: `api/v1/dashboard`,
    update: `api/v1/dashboard/update-visit`,
    getRpMonthYear: `api/v1/dashboard/report-month-in-year`,
  };
  export const moneyRouter = {
    getRate: 'api/v7/convert?q=',
  };
  export const productRouter = {
    create: `api/v1/product`,
    createMany: `api/v1/product/create-many`,
    update: `api/v1/product`,
    delete: `api/v1/product`,
    getById: `api/v1/product?id=`,
    getByCode: `api/v1/product/code`,
    getListSimilar: `api/v1/product/similar`,
    getFilter: `api/v1/product/filter`,
    getAll: `api/v1/product/all`,
    getListCombobox: `api/v1/product/for-combobox`,
    getProdBySupplier: `api/v1/product/product-by-supplier`,
    updateVisitCount: `api/v1/product/update-visit-count`,
  };
  
  export const orderRouter = {
    create: `api/v1/order`,
    createMany: `api/v1/order/create-many`,
    update: `api/v1/order`,
    updateStatusOrder: `api/v1/order/update-status`,
    delete: `api/v1/order`,
    getById: `api/v1/order?id=`,
    getFilter: `api/v1/order/filter`,
    getAll: `api/v1/order/all`,
    checkInsurance: `api/v1/order/check-insurance`,
    getListCombobox: `api/v1/order/for-combobox`,
  };
  export const cartRouter = {
    create: `api/v1/cart`,
    createMany: `api/v1/cart/create-many`,
    update: `api/v1/cart`,
    delete: `api/v1/cart`,
    getById: `api/v1/cart/get-by-user-id`,
    getFilter: `api/v1/cart/filter`,
    getAll: `api/v1/cart/all`,
    getListCombobox: `api/v1/cart/for-combobox`,
  };
  export const customerRouter = {
    create: `api/v1/account`,
    update: `api/v1/account`,
    delete: `api/v1/account`,
    getById: `api/v1/account?id=`,
    getFilter: `api/v1/account/filter`,
    getListCombobox: `api/v1/account/for-combobox`,
    register: `api/v1/account/register`,
    forgotPassword: `api/v1/account/forgot-password`,
    changePassword: `api/v1/account/update-password`,
  };
  export const productReviewRouter = {
    create: `api/v1/productReview`,
    createMany: `api/v1/productReview/create-many`,
    update: `api/v1/productReview`,
    delete: `api/v1/productReview`,
    getById: `api/v1/productReview?id=`,
    getFilter: `api/v1/productReview/filter`,
    getAll: `api/v1/productReview/all`,
    getListCombobox: `api/v1/productReview/for-combobox`,
  };
  export const categoryMetaProductRouter = {
    create: `api/v1/role-product`,
    createMany: `api/v1/role-product/create-many`,
    update: `api/v1/role-product`,
    delete: `api/v1/role-product`,
    getById: `api/v1/role-product?id=`,
    getFilter: `api/v1/role-product/filter`,
    getAll: `api/v1/role-product/all`,
    getListCombobox: `api/v1/role-product/for-combobox`,
  };
  export const userRouter = {
    getListRightOfUser: `api/v1/idm/users`,
    getListRoleOfUser: `api/v1/idm/users`,
    changePassword: `api/v1/idm/users/changepassword`,
    create: `api/v1/idm/users`,
  };
  