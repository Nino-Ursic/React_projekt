import { useState } from 'react'
import stil from './App.module.css'
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import Home from './pages/Home.jsx'
import Aktivnosti from './pages/Aktivnosti.jsx'
import Volonteri from './pages/Volonteri.jsx'
import Volonter from './pages/Volonter.jsx'
import Udruge from './pages/Udruge.jsx'
import Error from './pages/Error.jsx'
import Aktivnost from './pages/Aktivnost.jsx'
import userContext from './components/kontekst.jsx';

function App() {
  const [user, setUser] = useState('user');

  return (
    <>
      <userContext.Provider value={user}>
      <BrowserRouter>
        <nav className={stil.navigation}>
          <NavLink to='/'>Početna</NavLink>
          <NavLink to='/aktivnosti'>Aktivnosti</NavLink>
          <NavLink to='/volonteri'>Volonteri</NavLink>
          <NavLink to='/udruge'>Udruge</NavLink>
          <div>
            <button onClick={()=>{setUser(user === 'user' ? 'admin' : 'user')}}>Switch</button>
            <span>{user}</span>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='aktivnosti' element={<Aktivnosti />} />
          <Route path='aktivnosti/:id' element={<Aktivnost />} />
          <Route path='volonteri' element={<Volonteri />}/>
          <Route path='volonteri/:id' element={<Volonter />} />
          <Route path='udruge' element={<Udruge />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
      </userContext.Provider>
    </>
  )
}

export default App
