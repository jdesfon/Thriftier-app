<template>
  <div class="thePeriodHeader">
    <div class="header__nav">
      <v-btn
        icon
        class="ma-0"
        to="/home"
      >
        <v-icon color="white">
          keyboard_arrow_left
        </v-icon>
      </v-btn>
      <h1 class="nav__title">
        {{ period.title }}
      </h1>
      <v-btn
        icon
        class="ma-0"
      >
        <v-icon color="white">
          more_vert
        </v-icon>
      </v-btn>
    </div>
    <div class="header__infos">
      <span>budget <b>{{ period.budget }} €</b></span>
      <span class="infos__remaining-days"><b>{{ remainingDays }}</b> days left</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'ThePeriodHeader',
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  computed: {
    remainingDays() {
      return moment(this.period.endDate).diff(moment(), 'days');
    },
    formattedPerDay() {
      return Number(this.period.perDay).toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>
.thePeriodHeader {
    padding-top: 2rem;
    padding-bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: $light;

    .header__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.7rem;
        padding-right: 0.7rem;

        .nav__title {
            font-size: 1rem;
        }
    }

    .header__infos {
        padding-left: 1.7rem;
        padding-right: 2rem;
        padding-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 0.7rem;
    }
};
</style>
