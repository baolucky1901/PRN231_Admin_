// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'order',
    path: '/dashboard/order',
    icon: icon('ic_order'),
  },
  {
    title: 'account',
    path: '/dashboard/account',
    icon: icon('ic_user'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: icon('ic_category'),
  },
  {
    title: 'book',
    path: '/dashboard/book',
    icon: icon('ic_book'),
  },
  {
    title: 'ebook',
    path: '/dashboard/ebook',
    icon: icon('ic_ebook'),
  },
  // {
  //   title: 'physical and ebook',
  //   path: '/dashboard/physical-ebook',
  //   icon: icon('ic_ebook'),
  // },
  {
    title: 'publisher',
    path: '/dashboard/publisher',
    icon: icon('ic_publisher'),
  },
  {
    title: 'combo book',
    path: '/dashboard/combobook',
    icon: icon('ic_combobook'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
