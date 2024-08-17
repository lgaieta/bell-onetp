import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Product from "@/models/Product";
import { ReactElement } from "react";
import { MdAddShoppingCart } from "react-icons/md";

type ProductItemProps = {
    product: Product;
    endContent: ReactElement;
} & React.HTMLAttributes<HTMLDivElement>;

function ProductItem(props: ProductItemProps) {
    const { product, endContent, className, ...rest } = props;
    return (
        <Card
            key={product.id}
            className={cn(
                "rounded-2xl hover:bg-muted/20 transition-colors w-full",
                className,
            )}
            {...rest}
        >
            <CardContent className="flex flex-col min-[400px]:flex-row justify-between items-center gap-6 min-[400px]:gap-2 p-10">
                <li className="flex flex-col gap-1 w-full">
                    <p className="text-lg font-bold">{product.name}</p>
                    <p className="text-muted-foreground">
                        {product.description}
                    </p>
                </li>
                {endContent}
            </CardContent>
        </Card>
    );
}

export default ProductItem;
