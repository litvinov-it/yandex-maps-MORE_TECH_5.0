import LogoSVG from '../svg/logo';
import classes from './header.module.css'

function header() {
    return (
        <header className={classes.header}>
            <LogoSVG className={classes.logo} />
        </header>
    );
}

export default header;