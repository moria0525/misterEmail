import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/HomePage'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails';
import React from 'react';
import { EmailFolderList } from './cmps/EmailFolderList';

export function App() {

    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/email" element={<EmailIndex />} />
                        <Route path="/email/:emailId" element={<EmailDetails/>} />
                        <Route path="/email/starred" element={<EmailFolderList/>}/>
                    </Routes>
                </main>
                <AppFooter />
            </section>
        </Router>


    )
}
