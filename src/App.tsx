import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// import Home from './routes/Home/Home.component';
// import Navigation from './routes/Navigation/Navigation.component';
// import Authentication from './routes/Authentication/Authentication.component';
// import Shop from './routes/Shop/Shop.component';
// import Checkout from './routes/Checkout/Checkout.component';
import { checkUserSession } from './store/user/user.action';
import Spinner from './components/Spinner/Spinner.component';

const Home = lazy(() => import('./routes/Home/Home.component'));
const Navigation = lazy(
    () => import('./routes/Navigation/Navigation.component')
);
const Authentication = lazy(
    () => import('./routes/Authentication/Authentication.component')
);
const Shop = lazy(() => import('./routes/Shop/Shop.component'));
const Checkout = lazy(() => import('./routes/Checkout/Checkout.component'));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserSession());
    }, [dispatch]);

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/" element={<Navigation />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Authentication />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default App;
