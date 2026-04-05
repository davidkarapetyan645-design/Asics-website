export type PaymentBrand = "Visa" | "Mastercard" | "Amex" | "Mada";

export type CartItem = {
  colorName: string;
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
};
