import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Link from "next/link";

const CartIcon = () => {
    
	const [ cart ] = useContext( AppContext );
	const productsCount = ( null !== cart && undefined !== cart && Object.keys( cart ).length ) ? cart.totalProductsCount : '';
	const totalPrice = ( null !== cart && undefined !== cart && Object.keys( cart ).length ) ? cart.totalProductsPrice : '';

    return (
        <React.Fragment>
            <Link href="/cart" > 
                <a>
                    <div className="the-livable-cart-wrap">
                        { totalPrice ? <span style={{marginRight:'5px'}}>${totalPrice.toFixed(2)}</span> : '' }
                        <span className="the-livalbe-cart-icon-container" style={{position:'relative'}}>
                            <i className="fas fa-shopping-bag the-livalbe-cart-icon" style={{fontSize:'20px'}}></i> 
                            { productsCount ? 
                                <span className="the-livalbe-cart-count"
                                    style={{top:'-13px', left:'12px', paddingLeft:'5px', paddingRight:'5px', lineHeight:'16px', color:'#1b4b5e', minHeight:'16px', fontWeight:'700', borderRadius:'50%', backgroundColor:'#caffff', position:'absolute' }} >
                                    {productsCount}
                                </span> 
                                : '' }
                        </span>
                    </div>
                </a> 
            </Link>
        </React.Fragment>
    )
}

export default CartIcon;