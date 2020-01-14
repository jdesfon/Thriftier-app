import Vue from 'vue';
import Amplify from 'aws-amplify';
import './plugins/vuetify';
import App from './App.vue';
import config from './config';
import store from './store';
import router from './router';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: config.API_NAME,
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
});

// check if session to redirect on start
store.dispatch('user/IS_CURRENT_SESSION')
  .then(() => {
    router.push({ name: 'home' });
  })
  .catch(() => {
    router.push({ name: 'landing' });
  });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
