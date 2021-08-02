import Head from 'next/head';
import { AppProvider } from './context/AppContext';
import Header from './Header';

const Layout = ( props ) => {
    return (
        <AppProvider>
            <div>
                <Head>
                    <title>The Livable Studio</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.3/css/all.css" integrity="sha384-SZXxX4whJ79/gErwcOYf+zWLeJdY/qpuqC4cAa9rOGUstPomtqpuNWT9wdPEn2fk" crossOrigin="anonymous"/>
                    <link rel="stylesheet" href="https://bootswatch.com/5/litera/bootstrap.min.css"/>
                    
                </Head>
                <Header/>
                { props.children }
            </div>
        </AppProvider>
    );
};

export default Layout;