import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import NavBar from './components/NavBar/NavBar';
import News from './components/News/News';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';

function App() {
  const [progress, setProgress] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  document.body.style.backgroundColor = 'rgb(36, 39, 41)';
  return (
    <BrowserRouter>
      <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <LoadingBar color="#005abb" height={3} progress={progress} />
      <Routes>
        <Route
          exact
          key={uuidv4()}
          path="/"
          element={(
            <News
              setProgress={setProgress}
              key="home"
            />
          )}
        />
        <Route
          exact
          key={uuidv4()}
          path="register"
          element={(
            <Register
              key="register"
              setProgress={setProgress}
            />
          )}
        />
        <Route
          exact
          key={uuidv4()}
          path="login"
          element={(
            <Login
              key="login"
              setProgress={setProgress}
              setLoggedIn={setLoggedIn}
            />
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
