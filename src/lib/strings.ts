const apiStrings = {
    common: {
        invalid_fields_message: "One or more fields are not valid.",
        invalid_id_message: "Id is not valid.",
    },
    product: {
        console_product_post_error: "Error creating the product",
        console_product_put_error: "Error updating the product",
        console_product_delete_error: "Error deleting the product",
        console_product_fetch_error: "Error fetching the product",
        console_product_list_fetch_error: "Error fetching the product list",
        product_id_key: "id",
        product_not_found_message: "Product not found",
        product_creation_error_message:
            "An error occurred while creating the product.",
        product_fetch_error_message:
            "An error occurred while fetching the product.",
        product_list_fetch_error_message:
            "An error occurred while fetching the product list.",
        product_delete_error_message:
            "An error occurred while deleting the product.",
        product_update_error_message:
            "An error occurred while updating the product.",
    },
    user: {
        user_username_key: "username",
    },
    order: {
        console_order_post_error: "Error creating the order",
        console_order_fetch_error: "Error fetching the order",
        console_order_put_error: "Error updating the order",
        console_order_delete_error: "Error deleting the order",
        order_id_key: "id",
        order_not_found_message: "Order not found",
        order_already_exists: "Order already exists",
        order_creation_error_message:
            "An error occurred while creating the order.",
        order_fetch_error_message:
            "An error occurred while fetching the order.",
        order_update_error_message:
            "An error occurred while updating the order.",
        order_delete_error_message:
            "An error occurred while deleting the order.",
    },
};

const esStrings = {};

const strings = { ...esStrings, api: apiStrings };

export default strings;
