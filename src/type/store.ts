export type StoreType = {
  storeId: string;
  storeName: string;
  ImageUrl: string[];
  goodsName: string;
  startTime: string; // '2025-07-04T14:16:59.170Z';
  endTime: string; // '2025-07-04T14:16:59.170Z';
  originPrice: number;
  discount: number;
  salePrice: number;
  quantity: number;
  distance?: number;
  saleStatus: 'ON' | 'OFF';
};

export type SearchParams = {
  latitude: number;
  longitude: number;
  keyword: string;
  sortType: string;
  onlyAvailable: boolean;
  page: number;
  size: number;
};

export type StoreDetailType = {
  address: string;
  description: string;
  discount: number;
  endTime: string; // 종료시간
  goodsId: string;
  images: string[];
  originalPrice: number;
  quantity: number;
  salePrice: number;
  saleStatus: 'ON' | 'OFF';
  startTime: string; // 시작시간
  storeId: string;
  storeName: string;
};
