import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./components/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./components/Payment";
import Profile from "./components/Profile";
import Orders from "./order/Orders";
import OrderTracking from "./order/OrderTracking";
import Wishlist from "./pages/Wishlist";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

function AppContent() {
  const { isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ErrorBoundary fallbackTitle="Application Error">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={
              <ErrorBoundary fallbackTitle="Products Error">
                <Products />
              </ErrorBoundary>
            } />
            <Route path="/products/:id" element={
              <ErrorBoundary fallbackTitle="Product Details Error">
                <ProductDetail />
              </ErrorBoundary>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track-order" element={
              <ErrorBoundary fallbackTitle="Order Tracking Error">
                <OrderTracking />
              </ErrorBoundary>
            } />
            
            {/* Protected Routes */}
            <Route path="/checkout" element={
              <PrivateRoute>
                <ErrorBoundary fallbackTitle="Checkout Error">
                  <Checkout />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            <Route path="/checkout/payment" element={
              <PrivateRoute>
                <ErrorBoundary fallbackTitle="Payment Error">
                  <Payment />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <ErrorBoundary fallbackTitle="Profile Error">
                  <Profile />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            <Route path="/orders" element={
              <PrivateRoute>
                <ErrorBoundary fallbackTitle="Orders Error">
                  <Orders />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            <Route path="/wishlist" element={
              <PrivateRoute>
                <ErrorBoundary fallbackTitle="Wishlist Error">
                  <Wishlist />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            <Route path="/admin" element={
              <PrivateRoute adminOnly>
                <ErrorBoundary fallbackTitle="Admin Dashboard Error">
                  <Admin />
                </ErrorBoundary>
              </PrivateRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ErrorBoundary 
        fallbackTitle="Critical Application Error"
        fallbackMessage="Our application encountered a critical error. Please refresh the page or try again later."
      >
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;