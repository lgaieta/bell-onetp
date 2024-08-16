import Product from "@/models/Product";

interface ProductRepository {
    getById(id: Product["id"]): Promise<Product>;
    getList(): Promise<Product[]>;
    create(product: Product): Promise<Product>;
    update(newProduct: Product): Promise<Product>;
    delete(id: Product["id"]): Promise<void>;
}

export default ProductRepository;
