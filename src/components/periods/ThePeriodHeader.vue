<template>
  <div class="thePeriodHeader">
    <ThePeriodHeaderNav
      :period="period"
      @onMenuClick="isPeriodActionsListVisible = true"
    />

    <ThePeriodHeaderInfos :period="period" />

    <v-bottom-sheet
      v-model="isPeriodActionsListVisible"
      inset
    >
      <ThePeriodActions
        :period="period"
        @onClosePeriodActions="isPeriodActionsListVisible = false"
      />
    </v-bottom-sheet>
  </div>
</template>

<script>
import ThePeriodActions from './ThePeriodActions.vue';
import ThePeriodHeaderInfos from './ThePeriodHeaderInfos.vue';
import ThePeriodHeaderNav from './ThePeriodHeaderNav.vue';

export default {
  name: 'ThePeriodHeader',
  components: {
    ThePeriodActions,
    ThePeriodHeaderInfos,
    ThePeriodHeaderNav,
  },
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    isPeriodActionsListVisible: false,
    confirmDialog: false,
  }),
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
}

.confirmDialog {
  &__container {
    background-color: white;
  }
}
</style>
