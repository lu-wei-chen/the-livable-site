const next = require('next');
const express = require('express');
// const https = require('https');
// const path = require('path');
// const fs = require('fs');


const wooConfig = require('./wooConfig');
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const { response } = require('express');

const WooCommerce = new WooCommerceRestApi({
    url: wooConfig.siteUrl,
    consumerKey: wooConfig.consumerKey,
    consumerSecret: wooConfig.consumerSecret,
    version: 'wc/v3',
});

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(); //anything not defined by express will be handle by next.js

// app.use('/', (req, res, next) => {
//     res.send('HELLO THIS IS SSL SERVER');
// });

// const sslServer = https.createServer({
//     key:'',
//     cert:''
// }, app);
// sslServer.listen(3443, () => console.log('SECURE SERVER ON PORT 3443'))

app.prepare()
    .then( () => {
        const server = express();

        // server.get( '/getProducts', ( req, response ) => {
        //     WooCommerce.get("products", {
        //         per_page: 20,
        //       })
        //         .then((response) => {
        //           // Successful request
        //           console.log("Response Status:", response.status);
        //           console.log("Response Headers:", response.headers);
        //         //   console.log("Response Data:", response.data);
        //         //   console.log("Total of pages:", response.headers['x-wp-totalpages']);
        //         //   console.log("Total of items:", response.headers['x-wp-total']);
        //         })
        //         .catch((error) => {
        //           // Invalid request, for 4xx and 5xx statuses
        //           console.log("Response Status:", error.response.status);
        //           console.log("Response Headers:", error.response.headers);
        //           console.log("Response Data:", error.response.data);
        //         })
        //         .finally(() => {
        //           // Always executed.
        //         //   console.log("API REQUEST!");
        //         });
        // });

        server.get( '*', ( req, res ) => {
            return handle( req, res );
        } );
        
        server.listen( port, err => {
            if ( err ) {
                throw err;
            }
            console.log( `Ready on ${port}`);
        })
    })
    .catch( ex => {
        console.error(ex.stack);
        process.exit(1);
    });

