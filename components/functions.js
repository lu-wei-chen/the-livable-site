
export const getFloatVal = ( string ) => {

    let floatValue = string.match( /[+-]?\d+(\.\d+)?/g )[0];

    return ( null !== floatValue ) ? parseFloat( parseFloat( floatValue ).toFixed(2) ) : '';
};

export const addFirstProduct = ( product ) => {
    let productPrice = getFloatVal( product.price );
    
    let newCart = {
        products:[],
        totalProductsCount: 1,
        totalProductsPrice: productPrice,
    }
    
    const newProduct = createNewProduct( product, productPrice, 1 );
    newCart.products.push( newProduct );
    
    localStorage.setItem( 'the-livable-cart', JSON.stringify( newCart ) );

    return newCart;
};

export const createNewProduct = ( product, productPrice, qty ) => {
    return {
        databaseId: product.databaseId,
        image: product.image,
        name: product.name,
        price: productPrice,
        qty: qty,
		totalPrice: parseFloat( ( productPrice * qty ).toFixed( 2 ) )
    }

};

export const updateCart = ( existingCart, product, qtyToBeAdded, newQty = false  ) => {
    

	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, newQty );

	const addPrice = (total, item) => {
		total.totalPrice += item.totalPrice;
		total.qty += item.qty;
        
		return total;
	};

	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
	let total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } );

	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: parseInt( total.qty ),
		totalProductsPrice: parseFloat( total.totalPrice )
	};
    localStorage.setItem( 'the-livable-cart', JSON.stringify( updatedCart ) );

    return updatedCart;
};

export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded, newQty = false ) => {

    const productExistsIndex = isProductInCart( existingProductsInCart, product.databaseId );
    
    if ( -1 < productExistsIndex ) {
        let updatedProducts = existingProductsInCart;
        let updatedProduct = updatedProducts[ productExistsIndex ];

        updatedProduct.qty = ( newQty ) ? parseInt( newQty ) : parseInt( updatedProduct.qty + qtyToBeAdded );
		updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );

        return updatedProducts;
    } else {
        let productPrice = getFloatVal( product.price );
        const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
        existingProductsInCart.push( newProduct );

        return existingProductsInCart;
    }

};

export const isProductInCart = ( existingProductsInCart, productId ) => {
    
    const returnItemsThatExists = ( item, index ) => {
        
        if ( productId === item.databaseId ) {
            
            return item;
        }
    };

    const NewArray = existingProductsInCart.filter( returnItemsThatExists );

    return existingProductsInCart.indexOf( NewArray[0] );

};

export const removeItemFromCart = ( productId ) => {
    
    let existingCart = localStorage.getItem( 'the-livable-cart' );
    existingCart = JSON.parse( existingCart );

    if ( 1 === existingCart.products.length ) {
        localStorage.removeItem( 'the-livable-cart' );
        return null;
    } 

    const productExistsIndex = isProductInCart( existingCart.products, productId );
    if ( -1 < productExistsIndex ) {
        const productToBeRemoved = existingCart.products[ productExistsIndex ];
        const qtyToBeRemovedFromTotal = productToBeRemoved.qty;
        const priceToBeDeductedFromTotal = productToBeRemoved.totalPrice;

        let updatedCart = existingCart;
        updatedCart.products.splice( productExistsIndex, 1);
        updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
        updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

        localStorage.setItem('the-livable-cart', JSON.stringify( updatedCart ));

        return updatedCart;
    } else {
        return existingCart;
    }
    

};
