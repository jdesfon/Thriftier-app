import Vue from 'vue';
import VueRouter from 'vue-router';
import Lodash from 'lodash';
import Auth from '../views/auth/index.vue';
import Confirm from '../views/auth/Confirm.vue';
import Home from '../views/Home.vue';
import SignIn from '../views/auth/SignIn.vue';
import SignUp from '../views/auth/SignUp.vue';
import SignOut from '../views/auth/SignOut.vue';
import Landing from '../views/Landing.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
    children: [
      {
        path: '/auth/sign-in',
        name: 'sign-in',
        component: SignIn,
      },
      {
        path: '/auth/sign-up',
        name: 'sign-up',
        component: SignUp,
      },
      {
        path: '/auth/email-confirm',
        name: 'confirm',
        component: Confirm,
      },
      {
        path: '/auth/sign-out',
        name: 'sign-out',
        component: SignOut,
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) {
    return context.next;
  }

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.name === router.currentRoute.name) {
    return next();
  }

  // We extract the middleware inside meta middleware from the parent to the current
  const middleware = to.matched.reduce((acc, val) => {
    if (!Lodash.isEmpty(val.meta)) {
      if (Array.isArray(val.meta.middleware)) {
        acc.push(...val.meta.middleware);
      } else {
        acc.push(val.meta.middleware);
      }
    }
    return acc;
  }, []);

  if (!Lodash.isEmpty(middleware)) {
    const context = {
      from,
      next,
      router,
      to,
      store,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
