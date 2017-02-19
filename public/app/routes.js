import LoginComponent from './views/login';
import LayoutComponent from './views/layout';



import DashboardComponent from './views/dashboard';
import ShopProduct from './views/shop_product/index';



export default function routeConfig(router) {
    router.map({
        '/login': {
            name: 'login',
            component: LoginComponent
        },
        '/main': {
            name: 'main',
            component: LayoutComponent,
            subRoutes: {
                '/dashboard': {
                    name: 'dashboard',
                    component: DashboardComponent
                },
                '/shop_product/:shopid':{
                    name: 'shop_product',
                    component: ShopProduct
                }
            }
        }
    });

    router.redirect({
        '*': '/login',
        '/main': '/main/dashboard'
    });

    router.beforeEach(function (transition) {
        let token = localStorage.getItem('jwt_token');
        if (!token || token === null) {
            router.go('/login');
        }
        transition.next();
    });

}