import imgUrl from '../assets/imgs/email.jpg'

export function Home() {
    return (
        <section className="home">
            <h1>Welcome to our misterEmail App</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
