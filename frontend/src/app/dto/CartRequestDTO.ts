import { ProductDTO } from "./ProductDTO";
import { UserDTO } from "./UserDTO";
import { CartDTO } from "./CartDTO";

export class CartRequestDTO {
    name: string;
    email: string;
    cartId: number;
    cartQuantity: number;
    productId: number;
    productName: string;
    productPrice: number;
    productQuantity: number;
}
