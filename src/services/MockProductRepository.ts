import Product from "@/models/Product";
import ProductRepository from "@/models/ProductRepository";

const products: Product[] = [
    {
        id: 1,
        name: "Laptop",
        price: 999.99,
        description: "Laptop de alto rendimiento con 16GB de RAM y 512GB SSD.",
        stock: 25
    },
    {
        id: 2,
        name: "Smartphone",
        price: 499.99,
        description: "Smartphone con cámara de 108MP y 128GB de almacenamiento.",
        stock: 50
    },
    {
        id: 3,
        name: "Tablet",
        price: 299.99,
        description: "Tablet de 10 pulgadas con soporte para lápiz óptico.",
        stock: 15
    },
    {
        id: 4,
        name: "Auriculares Bluetooth",
        price: 89.99,
        description: "Auriculares inalámbricos con cancelación de ruido.",
        stock: 100
    },
    {
        id: 5,
        name: "Reloj Inteligente",
        price: 199.99,
        description: "Reloj inteligente con monitoreo de actividad y notificaciones.",
        stock: 30
    },
    {
        id: 6,
        name: "Teclado Mecánico",
        price: 79.99,
        description: "Teclado mecánico con retroiluminación RGB y switches mecánicos.",
        stock: 40
    },
    {
        id: 7,
        name: "Ratón Gaming",
        price: 49.99,
        description: "Ratón para gaming con alta precisión y retroiluminación.",
        stock: 60
    },
    {
        id: 8,
        name: "Monitor 4K",
        price: 399.99,
        description: "Monitor 4K de 27 pulgadas con colores vivos y ángulos de visión amplios.",
        stock: 20
    },
    {
        id: 9,
        name: "Impresora Inalámbrica",
        price: 129.99,
        description: "Impresora inalámbrica multifuncional con escáner y copias.",
        stock: 10
    },
    {
        id: 10,
        name: "Disco Duro Externo",
        price: 89.99,
        description: "Disco duro externo de 2TB con USB 3.0.",
        stock: 45
    }
];


class MockProductRepository implements ProductRepository {
    async create(product: Product): Promise<Product> {
        return product
    }

    async getList(): Promise<Product[]> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return products;
    }

    async getById(id: number): Promise<Product | null> {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return products.find((product) => product.id === id) || null;
    }
}

export default MockProductRepository;
