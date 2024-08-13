import Product from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";

const products: Product[] = [
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" },
    { id: 3, name: "Product C" },
    { id: 4, name: "Product D" },
    { id: 5, name: "Product E" },
    { id: 6, name: "Product F" },
    { id: 7, name: "Product G" },
    { id: 8, name: "Product H" },
    { id: 9, name: "Product I" },
    { id: 10, name: "Product J" },
    { id: 11, name: "Product K" },
    { id: 12, name: "Product L" },
    { id: 13, name: "Product M" },
    { id: 14, name: "Product N" },
    { id: 15, name: "Product O" },
    { id: 16, name: "Product P" },
    { id: 17, name: "Product Q" },
    { id: 18, name: "Product R" },
    { id: 19, name: "Product S" },
    { id: 20, name: "Product T" },
    { id: 21, name: "Product U" },
    { id: 22, name: "Product V" },
    { id: 23, name: "Product W" },
    { id: 24, name: "Product X" },
    { id: 25, name: "Product Y" },
    { id: 26, name: "Product Z" },
];

class MockProductRepository implements ProductRepository {
    async getList(): Promise<Product[]> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return products;
    }
}

export default MockProductRepository;
