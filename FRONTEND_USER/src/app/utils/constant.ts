export class QueryFilerModel {
    textSearch: string | undefined;
    pageSize!: number;
    pageNumber!: number;
    [key: string]: any;
  }  
  
export const ROLE_USER = 'USER';
export const PAGESIZE_MAX_VALUE = 3;
export const LIST_SORT_TYPE = [
    { id: 0, name: 'Mới nhất' },
    { id: 1, name: 'Giá tăng dần' },
    { id: 2, name: 'Giá giảm dần' },
    { id: 3, name: 'Lượt xem' },
    { id: 4, name: 'Đánh giá' },
    { id: 5, name: 'Tên A -> Z' },
  ];
  export const QUERY_FILTER_DEFAULT: QueryFilerModel = {
    pageNumber: 1,
    pageSize: 99999,
    textSearch: undefined,
  };
  export const PAGE_SIZE_OPTION_DEFAULT = [5, 10, 20, 50];
