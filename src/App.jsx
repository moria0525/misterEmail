import { Route, HashRouter as Router, Routes } from 'react-router-dom';

import { Home } from './pages/HomePage'
import { About } from './pages/AboutPage';

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex';
//import { EmailDetails } from './pages/EmailDetails';
//import { AboutTeam } from './cmps/AboutTeam';
//import { AboutVision } from './cmps/AboutVision';


export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/email" element={<EmailIndex />} />
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>


    )
}
//        /*<Route path="/email/:emailId" element={<EmailDetails />} />
