import logo from './logo.svg';
import './css/App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import LogIn from "./LogIn";
import Register from "./Register";
import Main from "./Main";
import Header from "./Header";

function App() {

  return (
      <Router>
          <Header/>
          <Routes>
              <Route path='/' element={<LogIn/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path={'/main'} element={<Main/>}/>
         </Routes>.
      </Router>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         DIE WITH React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
