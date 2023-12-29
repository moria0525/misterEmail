import { Link, NavLink } from "react-router-dom";
import imgUrl from '../assets/imgs/my_email.png'


export function AppHeader() {
    return (
        <header className="app-header">
            <section className="container">
            <img src={imgUrl} alt="My Email logo" className="logo"/>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/email/:folder">My Email</NavLink>
                </nav>
            </section>
        </header>
    )
}
