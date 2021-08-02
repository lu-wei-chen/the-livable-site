import Layout from "../components/Layout";
import Product from "../components/Product";
import client from '../components/ApolloClient';
import gql from 'graphql-tag';


const PRODUCTS_QUERY = gql`query{
    products(first: 10) {
        nodes {
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
      }
}`;
/**
 * 
 * @param {*} props 
 * @returns 
 */

const Index = (props) => {
    const { products } = props;
    return(
		<Layout>
			<div className="product-container">
				{ products.length ? (
					products.map( product => <Product key={ product.id } product={ product } /> )
				) : ''}
			</div>
		</Layout>

    )

}
Index.getInitialProps = async () => {
    const result = await client.query( {query:PRODUCTS_QUERY} );

    return {
        products: result.data.products.nodes,  
    };
    
};

export default Index;