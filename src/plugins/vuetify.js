import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    red: '#EA5F70',
    orange: '#FF6A3C',
    green: '#43A047',
    blue: '#039BE5',
    dark: '#424242',
    grey: '#E0E0E0',
    greyDark: '#BDBDBD',
    white: '#FFFFFF',
    themes: {
      isLight: true,
      light: {
        background: '#03A9F4',
      },
      dark: {
        background: '#424242',
      },
    },
  },
});
