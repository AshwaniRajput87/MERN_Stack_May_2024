import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/header/Header';
import NotFound from '../pages/notFound/NotFound';
// import Loader from '../components/loader';
import useFetchData from '../hooks/useFetchData';
import ProductListing from '../pages/productListing/ProductListing';
import CartItems from '../pages/cartItems/CartItems';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import useAuth from '../context/auth/useAuth.js';

const AppRoutes = () => {

  const {data: categories, error, isLoading } = useFetchData('http://localhost:3000/api/product/categories', []);

  console.log(categories.data);

  const { user } = useAuth();
  console.log(user);

  /**
  
     if(user && user.status){
      make anothe api call here of getting profile details
     }
  
   */

  return (
      <>
      
      {/* <Loader /> */}
        <Router>
            { user && user.status ==='success' ? <Header categories={categories.data} isLoading={isLoading}/> : <></>} 
            {/* <Header categories={categories && categories.data} isLoading={isLoading}/> */}
            <Routes>
                <Route path='/' element={<ProductListing />} />
                <Route path='/cart' element={<CartItems />} />
                <Route  path='/products/:categoryName' element={<ProductListing />}/>
                <Route path='*' element={<NotFound />} />
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </Router>
      </>
  )

}

export default AppRoutes;