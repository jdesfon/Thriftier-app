import Vue from 'vue';
import VueRouter from 'vue-router';
import Lodash from 'lodash';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('../views/Landing.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/auth/index.vue'),
    children: [
      {
        path: '/auth/sign-in',
        name: 'sign-in',
        component: () => import('../views/auth/SignIn.vue'),
      },
      {
        path: '/auth/sign-up',
        name: 'sign-up',
        component: () => import('../views/auth/SignUp.vue'),
      },
      {
        path: '/auth/email-confirm',
        name: 'confirm',
        component: () => import('../views/auth/Confirm.vue'),
      },
      {
        path: '/auth/sign-out',
        name: 'sign-out',
        component: () => import('../views/auth/SignOut.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/period/:id',
    name: 'period',
    component: () => import('../views/Period.vue'),
  },
  {
    path: '*', redirect: { name: 'landing' },
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
