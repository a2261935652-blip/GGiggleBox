export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export interface CustomerDetails {
  tiktokUsername: string;
  fullName: string; // Optional
  phoneNumber: string;
  address: string;
}

export enum AppStep {
  SELECTION = 0,
  DETAILS = 1,
  PAYMENT = 2,
  CONFIRMATION = 3,
}

export interface OrderState {
  selectedProduct: Product | null;
  customerDetails: CustomerDetails;
  paymentScreenshot: File | null;
}