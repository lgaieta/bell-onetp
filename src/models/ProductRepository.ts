import Product from "@/models/Product";

interface ProductRepository {
    getById(id: Product["id"]): Promise<Product | null>;
    getList(): Promise<Product[]>;
    create(product: Product): Promise<Product>;
    update(
        productId: Product["id"],
        newProduct: Product,
    ): Promise<Product | null>;
}

export default ProductRepository;
