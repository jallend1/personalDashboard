import '../css/header.css';

const Header = ({ isLoggedIn, toggleModal }) => {
    return (
        <header>
            {/* <img src="" alt="" /> */}
            <p>My Dashboard</p>
            <button onClick={toggleModal}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </header>
    );
}

export default Header;
