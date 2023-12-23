import imgUrl from '../assets/imgs/my_email.svg'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to our My Email App</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
