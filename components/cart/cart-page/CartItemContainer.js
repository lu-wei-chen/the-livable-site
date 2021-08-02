import Link from "next/link";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import CartItem from "./CartItem";
import { removeItemFromCart } from "../../functions";

const CartItemContainer = () => {

    const [ cart, setCart ] = useContext(AppContext);
    

    const handleRemoveProductClick = (e, productId) => {
        const updatedCart = removeItemFromCart( productId );
        
        setCart( updatedCart );
        
    };
    

    return (
        <div>
            { cart ? 
                <div className="the-livalbe-cart-wrapper container"> 
                    <h1 className="the-livable-cart-heading mt-5"> CART </h1> 
                    <table className="table table-hover"> 
                        <thead>
                            <tr className="the-livable-cart-header-container">
                                <th className="the-livable-cart-heading" scope="col"/> 
                                <th className="the-livable-cart-heading" scope="col"/> 
                                <th className="the-livable-cart-heading" scope="col"> Product </th>
                                <th className="the-livable-cart-heading" scope="col"> Price </th>
                                <th className="the-livable-cart-heading" scope="col"> Quantity </th>
                                <th className="the-livable-cart-heading" scope="col"> Total </th>
                            </tr>
                        </thead> 
                        <tbody>
						{ cart.products.length && (
							cart.products.map( item => (
								<CartItem
									key={ item.databaseId }
									item={ item }
									handleRemoveProductClick={ handleRemoveProductClick }
									setCart={ setCart }
								/>
							) )
						) }
						</tbody>
                    </table>

                    {/**  Cart total */}
                    <div className="row the-livable-cart-total mt-5" > 
                        <div className="col-6">
                            <h3> Cart Total</h3>
                            <table className="table table-hover"> 
                                <tbody>
                                    <tr className="table-light"> 
                                        <td className="the-livable-cart-element-total"> Subtotal </td>
                                        <td className="the-livable-cart-element-amt"> ${ cart.totalProductsPrice } </td>
                                    </tr>
                                    <tr className="table-light"> 
                                        <td className="the-livable-cart-element-total"> Total </td>
                                        <td className="the-livable-cart-element-amt"> ${ cart.totalProductsPrice } </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/**  Cart total */}
                            <Link href="/checkout">
                                <button className="btn btn-secondary the-livable-large-black btn">
                                    <span className="the-livable-cart-checkout-text"> Proceed to Checkout</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div> 
            : '' }
        </div>
    )
};

export default CartItemContainer;