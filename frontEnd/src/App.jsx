import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Footer from './component/Footer';
import Homepage from './pages/Homepage';
import Profilepage from './pages/Profilepage';
import Loginpage from './pages/Loginpage';
import MyNavbar from './component/Navbar/Navbar';
import "./App.css"
import Registerpage from './pages/Registerpage';
function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Login' element={<Loginpage />} />
          <Route path='/Register' element={<Registerpage />} />
          <Route path='/Profilepage/:id' element={<Profilepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
