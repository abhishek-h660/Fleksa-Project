import './App.css';
import HomeHeader from './components/header';
import Products from './components/products';
import Footer from './components/footer';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import CartItems from './components/cart';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' 
            element=
              { 
                <div className='main-page'>
                    <HomeHeader />
                    <Products />
                    <Footer />
                </div>
              }></Route>

          <Route exact path='/become_a_seller' element={< HomeHeader />}></Route>
          <Route exact path='/more' element={< HomeHeader />}></Route>
          <Route exact path='/cart' element={< CartItems />}></Route>
          <Route exact path='/signin' element={< HomeHeader />}></Route>
          <Route exact path='/signup' element={< HomeHeader />}></Route>
        </Routes>
         
      </div>
    </BrowserRouter>
  );
}
export default App;
