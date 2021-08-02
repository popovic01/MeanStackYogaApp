import { Product } from "../products/product.model";

export interface CartData {
    items: Array<Product>;
    userId: string;
    total: number;
}