import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// } 

// export default App;




//rcc
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';

import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";


export default class App extends Component {

  //in function based we directly returned function, here we declare under render function
  //in class based components instead of using useState we use this.state
  //in class based components instead of using useeffect we use componentDidMount(), componentDidUpdate(),...
  

  c='john'; //we can declare variable like this
  render() {
    return (
      <div>
        <Router>

        

         {/* hello my class based component {this.c} we can use variable like this. */}

         <NavBar />       
           {/* <News pageSize={5} category="general"/>  */}
          <Routes>
            <Route path='/' element={<News key='general' pageSize={5} country='us' category='general' />}></Route>
            <Route path='/general' element={<News key='general' pageSize={5} country='us' category='general' />}></Route>
            <Route path='/business' element={<News key='business' pageSize={5} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News key='entertainment' pageSize={5} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News key='health' pageSize={5} country='us' category='health' />}></Route>
            <Route path='/science' element={<News key='science' pageSize={5} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News key='sports' pageSize={5} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News key='technology' pageSize={5} country='us' category='technology' />}></Route>
          </Routes>

         </Router>


      </div>

    )
  }
}

//------------------------------------------------------







