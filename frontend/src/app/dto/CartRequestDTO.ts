import { ProductDTO } from "./ProductDTO";
import { UserDTO } from "./UserDTO";
import { CartDTO } from "./CartDTO";

export class CartRequestDTO {
    userDTO: UserDTO;
    cartDTO: CartDTO;
    productDTO: ProductDTO
}
