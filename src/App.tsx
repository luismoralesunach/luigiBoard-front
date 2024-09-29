import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Whiteboard } from './pages/Whiteboard'
import './App.css'

function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/1' element={<Whiteboard/>}/>
    </Routes>
    
    </>
  )
}

export default App
