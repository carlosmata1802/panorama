import React from 'react';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-dark bg-primary">
                <div className="container py-2">
                    <div className="d-flex align-items-center">
                        <i className="fas fa-bars text-white" aria-hidden="true" />
                        <h2 className="text-white m-0 ml-2">Posts List</h2>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header; 