<template>
  <div class="thePeriodHeaderNav">
    <v-btn
      icon
      class="ma-0"
      to="/home"
    >
      <v-icon color="white">
        keyboard_arrow_left
      </v-icon>
    </v-btn>
    <h1 class="thePeriodHeaderNav__title">
      {{ period.title }}
    </h1>
    <v-btn
      icon
      class="ma-0"
      @click="handleMenuClick"
    >
      <v-icon color="white">
        more_vert
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ThePeriodHeaderNav',
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleMenuClick() {
      this.$emit('onMenuClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.thePeriodHeaderNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.7rem;
  padding-right: 0.7rem;

  &__title {
    font-size: 1rem;
  }
}
</style>
