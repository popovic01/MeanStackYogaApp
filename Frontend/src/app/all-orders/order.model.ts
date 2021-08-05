import { Product } from "../products/product.model";

export interface Order {
    items: Array<Product>;
    name: string;
    subTotal: number;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    currUser: string;
    username: string;
}