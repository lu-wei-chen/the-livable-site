import gql from "graphql-tag";
import { withRouter } from "next/router";
import Layout from "../components/Layout";
import client from "../components/ApolloClient";
import Product from "../components/Product";

const PRODUCT_BY_CATEGORY_ID = gql` query Product_Category( $id: ID! ){
    productCategory( id: $id ) {
        name
        products {
          edges {
            node {
              databaseId
              id
              slug
              description
              name
              image {
                sourceUrl 
                title
                srcSet
                uri
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
        }
      }
}`;
const Category = withRouter( ( props ) => {

    const  { categoryName, products } = props;

    return (
        <Layout>
            { categoryName ? <h3 className="m-5">{ categoryName }</h3> : '' }        
            <div className="product-container row">
                { undefined !== products && products.length ? ( products.map( product => <Product key={product.node.id} product={ product.node }/>  ) ) : '' }
            </div>
        </Layout>
    )
} );

Category.getInitialProps = async ( context ) => {
    
    let { query: { slug } } = context;
	const id = slug ? slug.split( '-' ).pop() : context.query.id;

    const res = await client.query( { 
        query: PRODUCT_BY_CATEGORY_ID,
        variables: {id: id }
     } );

     return {
         categoryName: res.data.productCategory.name,
         products: res.data.productCategory.products.edges
     }

};

export default Category;