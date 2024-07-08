// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SpotifyLogin from './SpotifyLogin';
import Home from './Home';
import Callback from './Callback';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpotifyLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
