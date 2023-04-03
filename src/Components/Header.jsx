import '../css/header.css';

const Header = ({ isLoggedIn, signInWithGoogle, signOut }) => {
    return (
        <header>
            {/* <img src="" alt="" /> */}
            <p>My Dashboard</p>
            {isLoggedIn ? (
                <button onClick={signOut}>Logout</button>
            ) : (
                <button onClick={signInWithGoogle}>Login</button>
            )}
        </header>
    );
}

export default Header;
