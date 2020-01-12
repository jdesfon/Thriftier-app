<template>
  <div class="periodActions">
    <BaseConfirmDialog
      :message="message"
      :is-confirm-dialog-visible="isConfirmDialogVisible"
      @yes="confirmAction"
      @no="isConfirmDialogVisible = false"
    />
    <v-list
      two-line
      dense
    >
      <v-list-tile
        v-if="period.isOpen"
        @click="handleClosePeriod"
      >
        <v-list-tile-action>
          <v-icon color="black">
            close
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Close period
          </v-list-tile-title>
          <v-list-tile-sub-title>
            No more expenses can be added
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile
        @click="handleDeletePeriod"
      >
        <v-list-tile-action>
          <v-icon color="red">
            delete_outline
          </v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Delete period
          </v-list-tile-title>
          <v-list-tile-sub-title>
            All of this period history will be deleted
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { PERIOD, CLOSE_PERIOD, DELETE_PERIOD } from '../../store/modules/period-types';
import BaseConfirmDialog from '../BaseConfirmDialog.vue';

export default {
  name: 'ThePeriodActions',
  components: { BaseConfirmDialog },
  props: {
    period: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    message: 'hello',
    currentAction: null,
    closePeriodData: {
      message: 'Do you really want to close this period ?',
      actions: null,
    },
    deletePeriodData: {
      message: 'Do you really want to delete this period ?',
      actions: null,
    },
    isConfirmDialogVisible: false,
  }),
  methods: {
    ...mapActions(PERIOD, {
      closePeriod: CLOSE_PERIOD,
      deletePeriod: DELETE_PERIOD,
    }),
    confirmAction() {
      this.currentAction({ periodId: this.period.idperiod })
        .then(() => {
          this.$router.push({ name: 'home' });
        })
        .finally(() => {
          this.isConfirmDialogVisible = false;
          this.$emit('onClosePeriodActions');
        });
    },
    cancelAction() {
      this.isConfirmDialogVisible = false;
      this.$emit('onClosePeriodActions');
    },
    handleClosePeriod() {
      this.message = this.closePeriodData.message;
      this.currentAction = this.closePeriod;
      this.isConfirmDialogVisible = true;
    },
    handleDeletePeriod() {
      this.message = this.closePeriodData.message;
      this.currentAction = this.deletePeriod;
      this.isConfirmDialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.periodActions {
  background-color: $light;
}
</style>
