export interface Product {
    _id: string,
    name: string;
    description: string;
    colors: Array<string>;
    price: number;
    stock: number;
    quantity: number;
    category: string;
    imagePath: string;
    selectedColor: string;
}