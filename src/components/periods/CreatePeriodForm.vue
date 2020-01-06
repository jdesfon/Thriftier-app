<template>
  <div class="createPeriodForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        label="Period"
        placeholder="enter a period name"
        :rules="titleRules"
      />

      <v-text-field
        v-model="budget"
        label="Budget"
        placeholder="enter a period budget"
        type="number"
        min="0"
        :rules="budgetRules"
        validate-on-blur
        clearable
      />

      <v-dialog
        ref="startDateDialog"
        v-model="isStartDatePickerVisible"
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
        width="290px"
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
        @click="handleSubmit"
      >
        <span class="submit-button__text">submit</span>
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import notifications from '../../mixins/notifications';
import { PERIOD, CREATE_PERIOD } from '../../store/modules/period-types';

export default {
  name: 'CreatePeriodForm',
  mixins: [notifications],
  data() {
    return {
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'this field is required',
      ],
      budget: '',
      budgetRules: [
        v => !!v || 'this field is required',
      ],
      isStartDatePickerVisible: false,
      isEndDatePickerVisible: false,
      startDate: new Date().toISOString()
        .substr(0, 10),
      endDate: '',
    };
  },
  computed: {
    minEndDate() {
      return this.startDate ? this.startDate : null;
    },
    formattedStartDate: {
      get() {
        return this.startDate ? moment(this.startDate)
          .format('MMM Do, YYYY') : '';
      },
      set(val) {
        this.formattedStartDate = moment(val)
          .format('MMM Do, YYYY');
      },
    },
    formattedEndDate: {
      get() {
        return this.endDate ? moment(this.endDate)
          .format('MMM Do, YYYY') : '';
      },
      set(val) {
        this.formattedEndDate = moment(val)
          .format('MMM Do, YYYY');
      },
    },
  },
  watch: {
    startDate(value) {
      if (moment(value)
        .isAfter(this.endDate)) {
        this.endDate = null;
      }
    },
  },
  methods: {
    ...mapActions(PERIOD, {
      createPeriod: CREATE_PERIOD,
    }),
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const periodObj = {
          title: this.title,
          budget: this.budget,
          startDate: moment(this.startDate)
            .format('YYYY-MM-DD'),
          endDate: moment(this.endDate)
            .format('YYYY-MM-DD'),
        };
        this.createPeriod(periodObj);
        this.$refs.form.reset();
        this.$emit('close');
      } else {
        this.notifyError('Form is invalid!');
      }
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
