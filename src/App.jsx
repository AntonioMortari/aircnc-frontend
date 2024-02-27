import './App.css';
import logo from './assets/logo.svg';
import Root from './root';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnc" />
      <div className='content'>
        <ToastContainer />
        <Root />
      </div>
    </div>
  )
}

export default App
