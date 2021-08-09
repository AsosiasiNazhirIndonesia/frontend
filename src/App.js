import './App.css';
import { Routes } from './routes';
import { Provider } from 'react-redux';
import { configureStore } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={configureStore()}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
