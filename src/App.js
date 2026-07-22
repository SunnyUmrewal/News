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
import React from 'react'
import NavBar from './Components/NavBar';
import News from './Components/News';

import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoadingBar from "react-top-loading-bar";

const App=(props)=> {

  //in function based we directly returned function, here we declare under render function
  //in class based components instead of using useState we use this.state
  //in class based components instead of using useeffect we use componentDidMount(), componentDidUpdate(),...
  
        //value  ,func to change value
  const [progress,setProgress] = useState(0)

    return (
      <div>
        <Router>

        

         {/* hello my class based component {this.c} we can use variable like this. */}
 
        <LoadingBar
          height={3}
          color="#ff0033"
          progress={progress} 
        />
         <NavBar />  
         
           {/* <News setProgress={setProgress} pageSize={5} category="general"/>  */}
          <Routes>
            <Route path='/' element={<News setProgress={setProgress} key='top' pageSize={5} country='us' category='top' />}></Route>
            <Route path='/top' element={<News setProgress={setProgress} key='top' pageSize={5} country='us' category='top' />}></Route>
            <Route path='/business' element={<News setProgress={setProgress} key='business' pageSize={5} country='us' category='business' />}></Route>
            <Route path='/entertainment' element={<News setProgress={setProgress} key='entertainment' pageSize={5} country='us' category='entertainment' />}></Route>
            <Route path='/health' element={<News setProgress={setProgress} key='health' pageSize={5} country='us' category='health' />}></Route>
            <Route path='/science' element={<News setProgress={setProgress} key='science' pageSize={5} country='us' category='science' />}></Route>
            <Route path='/sports' element={<News setProgress={setProgress} key='sports' pageSize={5} country='us' category='sports' />}></Route>
            <Route path='/technology' element={<News setProgress={setProgress} key='technology' pageSize={5} country='us' category='technology' />}></Route>
          </Routes>

         </Router>


      </div>

    )
  
}

export default App;
//------------------------------------------------------







