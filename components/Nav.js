import Link from 'next/link';
import CartIcon from './cart/cartIcon';

const Nav = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <Link href="/">
                    <a className="nav-link active" >The Livable </a>
                </Link>

                <div className="collapse navbar-collapse" id="navbarColor03">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" href="/categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Separated link</a>
                        </div>
                        </li>
                    </ul>

                    <div>
                        <CartIcon/>
                    </div>
                </div>

        </nav>
    )
};

export default Nav;
