import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes } from './routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { magic } from './magic/lib/magic';
import { UserContext } from './magic/lib/UserContext';

function App() {
  const [user, setUser] = useState();

  // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, set it to {user: null}
  useEffect(() => {
    setUser({ loading: true });
    magic.user.isLoggedIn().then((isLoggedIn) => {
      return isLoggedIn
        ? magic.user.getMetadata().then((userData) => 
        {
          setUser(userData);
        })
        : setUser({ user: null });
    });
  }, []);

  return (
    <div className="App">
      <Provider store={configureStore()}>
        <UserContext.Provider value={[user, setUser]}>
          <Routes />
        </UserContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
