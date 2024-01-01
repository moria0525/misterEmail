import { Route, HashRouter as Router, Routes } from 'react-router-dom';

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
                        <Route path="/" element={<EmailIndex />} />
                        <Route path="/:folder" element={<EmailIndex />}>
                            <Route path="/:folder/:emailId" element={<EmailDetails />} />
                            <Route path="/:folder/edit/:emailId?" element={<EmailEdit />} />
                        </Route>
                    </Routes>
                </main>
                <UserMsg />
                <AppFooter />
            </section>
        </Router>
    );
}
