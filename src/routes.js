import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AccountPage from './pages/AccountPage';
import OrderPage from './pages/OrderPage';
import CategoryPage from './pages/CategoryPage';
import BookPage from './pages/BookPage';
import EBookPage from './pages/EBookPage';
import PublisherPage from './pages/PublisherPage';
import ComboBookPage from './pages/ComboBookPage';
import ListBookPage from './pages/ListBookPage';
import NewBook from './pages/BookPage/NewBook';
import NewEBook from './pages/E-Book/NewEBook';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'order', element: <OrderPage /> },
        { path: 'account', element: <AccountPage /> },
        { path: 'category', element: <CategoryPage /> },
        { path: 'book', element: <BookPage /> },
        { path: 'ebook', element: <EBookPage /> },
        { path: 'publisher', element: <PublisherPage /> },
        { path: 'combobook', element: <ComboBookPage />, 
          children: [
            { element: <Navigate to="/dashboard/combobook" />, index: true },
            { path: 'listbook', element: <ListBookPage /> },
          ] },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'new-book', element: <NewBook /> },
        { path: 'new-e-book', element: <NewEBook /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
