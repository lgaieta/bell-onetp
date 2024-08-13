import Product from "@/models/Product";

interface ProductRepository {
    getList(): Promise<Product[]>;
}

export default ProductRepository;
