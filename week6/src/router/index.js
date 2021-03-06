import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/front/Index')
const Products = () => import('@/views/front/product/Index')
const ProductDetail = () => import('@/views/front/product/components/ProductDetail')
const Cart = () => import('@/views/front/cart/Index')

const Login = () => import('@/views/front/login/Index')

const Dashboard = () => import('@/views/dashboard/Index')
const AdminProducts = () => import('@/views/dashboard/products/AdminProducts')
const AdminOrders = () => import('@/views/dashboard/orders/AdminOrders')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '/', component: Home },
      { path: '/products', component: Products },
      { path: '/product/:id', component: ProductDetail },
      { path: '/cart', component: Cart }
    ]
  },
  // 登入
  {
    path: '/login',
    component: Login
  },
  // 後台
  {
    path: '/admin',
    component: Dashboard,
    redirect: '/admin/products',
    children: [
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: AdminOrders }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
  scrollBehavior() {
    return { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // 需要登入的路由: 地址是以 /admin 開頭
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  if (!token && to.path.startsWith('/admin')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
