import Link from "next/link";
import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { addFirstProduct, updateCart } from "../functions";

const AddToCartButton = ( props ) => {

    const { product } = props;
    const [ cart, setCart ] = useContext( AppContext );
    const [ showViewCart, setShowViewCart ] = useState( false );

    const handleAddToCartClick = () => {
        if ( process.browser ) {
            let existingCart = localStorage.getItem('the-livable-cart');

            if ( existingCart ){
                existingCart = JSON.parse( existingCart );
                
                const qtyToBeAdded = 1;

                const updatedCart = updateCart( existingCart, product, qtyToBeAdded );
                setCart( updatedCart );
            
            } else {
                const newCart = addFirstProduct( product );
                
                setCart( newCart );
                
            }
            setShowViewCart( true );

        }
    };

    return(
        <React.Fragment>
            <button onClick={handleAddToCartClick} className="btn btn-secondary"> Add to cart </button>
            { showViewCart ? ( <Link href="/cart"><button className="the-livable-view-cart-btn btn btn-secondary"> View Cart</button></Link>) : '' }
        </React.Fragment>
    )
};

export default AddToCartButton;