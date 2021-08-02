/* THIS IS PRODUCT SINGLE PAGE */

import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import client from "../components/ApolloClient";
import gql from 'graphql-tag';

const Product = withRouter( ( props ) => {

    const { product } = props;

    return(
		<Layout>
			{ product ? (
				<div className="woo-next-single">
					<div className="woo-next-single__product card bg-light mb-3 p-5">
						<div className="card-header">{ product.name }</div>
						<div className="card-body">
							<h4 className="card-title">{ product.name }</h4>
							<img src={ product.image.sourceUrl } alt="Product Image" width="200" srcSet={ product.image.srcSet }/>
							<p className="card-text">{ product.description }</p>
                            <p className="card-text">{ product.price }</p>
						</div>
					</div>
				</div>
			) : '' }
		</Layout>
    )
});

Product.getInitialProps = async function( context ) {
    //getInitialProps get whatever from the server and pass it to client
    // context(in getInitialProps) has a property called query 
    
    let { query: { slug } } = context;
	const id = slug ? parseInt( slug.split( '-' ).pop() ) : context.query.databaseId;

    const PRODUCT_QUERY = gql`query Product($databaseId: ID!){
        product( id: $databaseId, idType: DATABASE_ID ) {
            name
            id
            slug
            description
            databaseId
            image {
              uri
              title
              sourceUrl
              srcSet
            }
            ... on SimpleProduct {
                price
            }
            ... on ExternalProduct {
            price
            }
            ... on VariableProduct {
            price
            }
        }
    }`;

    const res = await client.query( {
        query: PRODUCT_QUERY,
        variables: { databaseId:id }
    });

    return {
        product: res.data.product
    }

}

export default Product;