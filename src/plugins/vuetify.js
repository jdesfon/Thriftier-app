import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    themes: {
      isLight: false,
      light: {
        background: '#039BE5',
        red: '#EA5F70',
        orange: '#FF6A3C',
        green: '#43A047',
        blue: '#039BE5',
        dark: '#424242',
        grey: '#E0E0E0',
        greyDark: '#BDBDBD',
        white: '#FFFFFF',
      },
      dark: {
        background: '#424242',
      },
    },
  },
});
