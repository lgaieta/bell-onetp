import Product from "@/models/Product";

interface ProductRepository {
    getById(id: Product["id"]): Promise<Product | null>;
    getList(): Promise<Product[]>;
    create(product: Product): Promise<Product>
}

export default ProductRepository;
