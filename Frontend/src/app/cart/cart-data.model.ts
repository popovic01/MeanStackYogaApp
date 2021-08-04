import { Product } from "../products/product.model";

export interface CartData {
    items: Array<Product>;
    user: string;
    subTotal: number;

}