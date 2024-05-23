export interface ShopProductType {
    id: number;
    brandName: string;
    productCode: string;
    productName: string;
    productSubName: string;
    price: number;
    productImageResponse: {
        productImage: string[];
    };
}
