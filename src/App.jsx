import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { Home } from './pages/HomePage'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { EmailIndex } from './pages/EmailIndex';
import { EmailDetails } from './cmps/EmailDetails';
import React from 'react';
import { EmailFolderList } from './cmps/EmailFolderList';
import { EmailEdit } from './cmps/EmailCompose';
import { UserMsg } from './cmps/UserMsg';

export function App() {
    return (
        <Router>
            <section className='main-app'>
                <AppHeader />
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/email/:folder" element={<EmailIndex />}>
                             <Route path="/email/:folder/edit/:emailId?" element={<EmailEdit />} />
                        </Route>
                        <Route path="/email/:folder/:emailId" element={<EmailDetails />} />
                       
                    </Routes>

                </main>
                <UserMsg />
                <AppFooter />
            </section>
        </Router>
    );
}
