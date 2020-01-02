<template>
  <div class="createPeriodForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="periodName"
        label="Period"
        placeholder="enter a period name"
      />

      <v-text-field
        v-model="budget"
        label="Budget"
        placeholder="enter a period budget"
        type="number"
      />
      <v-dialog
        ref="startDateDialog"
        v-model="isStartDatePickerVisible"
        :return-value.sync="startDate"
        persistent
        lazy
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="formattedStartDate"
            label="Start date"
            placeholder="enter a start date"
            readonly
            hide-details
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="startDate"
          header-color="blue"
          color="blue"
          width="290px"
          full-width
        >
          <v-spacer />
          <v-btn
            flat
            color="primary"
            @click="isStartDatePickerVisible = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.startDateDialog.save(startDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-dialog
        ref="endDateDialog"
        v-model="isEndDatePickerVisible"
        :return-value.sync="endDate"
        persistent
        lazy
        full-width
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="formattedEndDate"
            label="End date"
            placeholder="enter an end date"
            readonly
            hide-details
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="endDate"
          :min="minEndDate"
          header-color="blue"
          color="blue"
          width="290px"
          full-width
        >
          <v-spacer />
          <v-btn
            flat
            color="primary"
            @click="isEndDatePickerVisible = false"
          >
            Cancel
          </v-btn>
          <v-btn
            flat
            color="primary"
            @click="$refs.endDateDialog.save(endDate)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>

      <v-btn
        class="submit-button"
        block
        round
        color="blue"
      >
        <span class="submit-button__text">submit</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CreatePeriodForm',
  data() {
    return {
      valid: true,
      periodName: '',
      budget: '',
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      startDate: moment().format(),
      endDate: '',
    };
  },
  computed: {
    minEndDate() {
      return this.startDate ? this.startDate : null;
    },
    formattedStartDate() {
      return this.startDate ? moment(this.startDate).format('MMM Do, YYYY') : '';
    },
    formattedEndDate() {
      return this.endDate ? moment(this.endDate).format('MMM Do, YYYY') : '';
    },
  },

};
</script>

<style lang="scss" scoped>
.createPeriodForm {
  padding: 1.2rem;
}

.submit-button {
    margin-top: 1rem;
    &__text {
      color: $light;
      font-weight: bold;
    }
}
</style>
