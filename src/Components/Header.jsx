import '../css/header.css';
import Button from './Button';

const Header = ({ isLoggedIn, signInWithGoogle, signOut }) => {
    return (
        <header>
            {/* <img src="" alt="" /> */}
            <p>My Dashboard</p>
            {isLoggedIn ? (
                <Button text="Logout" onClick={signOut} className="neon-button" />
            ) : (
                <Button text="Login" onClick={signInWithGoogle} className="neon-button" />
            )}
        </header>
    );
}

export default Header;
