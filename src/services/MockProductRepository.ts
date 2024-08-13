import Product from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";

const products: Product[] = [
    { id: 1, name: "Product A", price: 1000 },
    { id: 2, name: "Product B", price: 1000 },
    { id: 3, name: "Product C", price: 1000 },
    { id: 4, name: "Product D", price: 1000 },
    { id: 5, name: "Product E", price: 1000 },
    { id: 6, name: "Product F", price: 1000 },
    { id: 7, name: "Product G", price: 1000 },
    { id: 8, name: "Product H", price: 1000 },
    { id: 9, name: "Product I", price: 1000 },
    { id: 10, name: "Product J", price: 1000 },
    { id: 11, name: "Product K", price: 1000 },
    { id: 12, name: "Product L", price: 1000 },
    { id: 13, name: "Product M", price: 1000 },
    { id: 14, name: "Product N", price: 1000 },
    { id: 15, name: "Product O", price: 1000 },
    { id: 16, name: "Product P", price: 1000 },
    { id: 17, name: "Product Q", price: 1000 },
    { id: 18, name: "Product R", price: 1000 },
    { id: 19, name: "Product S", price: 1000 },
    { id: 20, name: "Product T", price: 1000 },
    { id: 21, name: "Product U", price: 1000 },
    { id: 22, name: "Product V", price: 1000 },
    { id: 23, name: "Product W", price: 1000 },
    { id: 24, name: "Product X", price: 1000 },
    { id: 25, name: "Product Y", price: 1000 },
    { id: 26, name: "Product Z", price: 1000 },
];

class MockProductRepository implements ProductRepository {
    async getList(): Promise<Product[]> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return products;
    }
}

export default MockProductRepository;
