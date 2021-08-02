import Product from "../../Product";
import { useState } from "react";

import { updateCart } from "./../../functions";

const CartItem = ( { item, setCart, handleRemoveProductClick } ) => {
    
    const [ productCount, setProductCount ] = useState( item.qty );

    const handleQtyChange = ( e ) => {
        if ( process.browser ) { 
            const newQty = e.target.value;
            setProductCount( newQty );
        

            let existingCart = localStorage.getItem('the-livable-cart');
            existingCart = JSON.parse( existingCart );

            const updatedCart = updateCart( existingCart, item, false, newQty );
            setCart( updatedCart );

        }
    
    };

    return ( 
        <tr className="the-livable-cart-item" key={ item.databaseId } > 
            {/**  cross icon */}
            <th className="the-livable-cart-element the-livable-cart-el-close"> 
                <span className="the-livable-cart-close-icon" onClick={ ( e ) => handleRemoveProductClick( e, item.databaseId ) }> 
                    <i className="fa fa-times-circle"></i>
                </span>
            </th>

            {/**  image */}
            <td className="the-livable-cart-element">
                <img width="64" src={ item.image.sourceUrl } srcSet={ item.image.srcSet } alt={ item.image.title } />

            </td>

            {/**  name */}
            <td className="the-livable-cart-element"> {item.name} </td>

            {/**  price */}
            <td className="the-livable-cart-element"> {item.price} </td>

            {/**  qty */}
            <td className="the-livable-cart-element"> 
                
                <input type="number" min="1" className="the-livable-qty-input" value={ productCount } 
                    onChange={ handleQtyChange }
                />
            </td>

            {/**  total */}
            <td className="the-livable-cart-element"> {item.totalPrice} </td>
        </tr>
    )
};

export default CartItem;