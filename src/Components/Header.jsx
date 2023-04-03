import '../css/header.css';

const Header = ({ isLoggedIn, signInWithGoogle }) => {
    return (
        <header>
            {/* <img src="" alt="" /> */}
            <p>My Dashboard</p>
            <button onClick={signInWithGoogle}>{isLoggedIn ? 'Logout' : 'Login'}</button>
        </header>
    );
}

export default Header;
