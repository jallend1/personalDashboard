import '../css/header.css';

const Header = ({ isLoggedIn, signInWithGoogle, signOut }) => {
    return (
        <header>
            {/* <img src="" alt="" /> */}
            <p>My Dashboard</p>
            {isLoggedIn ? (
                <button className="neon-button" onClick={signOut}>Logout</button>
            ) : (
                <button className="neon-button" onClick={signInWithGoogle}>Login</button>
            )}
        </header>
    );
}

export default Header;
