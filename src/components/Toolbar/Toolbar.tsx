import {NavLink} from "react-router-dom";

const Toolbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Contacts</NavLink>
            </div>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to='/newContact' className="nav-link">Add New Contact</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;