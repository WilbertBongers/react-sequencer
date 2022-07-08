import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SongApp from './pages/SongApp.js';

function App() {


    return (
            <Routes>
                <Route exact path="/" element={<SongApp />} />
                <Route path="/song/:id" element={<SongApp />} />
            </Routes>
    );
}

export default App;
