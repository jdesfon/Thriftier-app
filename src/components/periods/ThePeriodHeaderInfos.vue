<template>
  <div class="thePeriodHeaderInfos">
    <span>
      <b>{{ remainingDays }}</b>
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
      const endDate = moment(this.period.endDate);
      const now = moment();
      const daysDiff = moment([
        endDate.get('year'),
        endDate.get('month'),
        endDate.get('date'),
      ]).diff(moment([
        now.get('year'),
        now.get('month'),
        now.get('date'),
      ]), 'days');
      return daysDiff > 1 ? `${daysDiff} days before closing` : `${daysDiff} day before closing`;
    },
  },
};
</script>

<style lang="scss" scoped>
.thePeriodHeaderInfos {
  padding-left: 1.7rem;
  padding-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 0.8rem;
  color: $grey-dark;
}
</style>
