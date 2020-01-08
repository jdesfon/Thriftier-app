<template>
  <div class="thePeriodHeaderInfos">
    <span>budget <b>{{ period.budget }} €</b></span>
    <span>
      <b>{{ remainingDays }}</b> days left
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
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
  },
};
</script>

<style lang="scss" scoped>
.thePeriodHeaderInfos {
  padding-left: 1.7rem;
  padding-right: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.8rem;
  color: $light;
}
</style>
