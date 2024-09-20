export enum Status {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
}
export interface INewAdvertisement {
  advertisementName: string;
  advertisementLink: string;
  advertisementPosition: string;
  startTime: string;
  endTime: string;
  price: number;
  status: Status;
  advertisingFields: [
    {
      advertisingFieldId: number;
      advertisingFieldName: string;
    }
  ];
}
export interface IAdvertisement extends INewAdvertisement {
  advertisementId: number;
}
