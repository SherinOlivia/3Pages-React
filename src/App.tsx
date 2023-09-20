import './App.css'
import  {BrowserRouter, Route, Routes } from 'react-router-dom'
import { CategoryList, Login, Register } from './containers'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CategoryList />} />
        <Route path='/login' element={<Login />} /> 
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

