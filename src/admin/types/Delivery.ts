export type DeliveryArea = {
  id: string;
  name: string;
  fee: number;
  estimatedTime: number;
  minOrderValue?: number;
  active: boolean;
};
