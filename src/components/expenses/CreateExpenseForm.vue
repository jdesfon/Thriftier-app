<template>
  <div class="createExpenseForm">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="title"
        label="Title"
        placeholder="enter an expense title"
        :rules="titleRules"
      />

      <v-text-field
        v-model="amount"
        label="Amount"
        placeholder="enter the amount"
        type="number"
        min="0"
        :rules="amountRules"
        validate-on-blur
        clearable
      />

      <v-select
        v-model="fkTransactionType"
        :items="transactionTypes"
        item-value="idtransaction_type"
        item-text="type"
        label="TransactionType"
        placeholder="select a transaction type"
      />

      <v-select
        v-model="fkCategory"
        :items="categories"
        item-value="idcategory"
        item-text="categoryName"
        label="Category"
        placeholder="select a category"
      />

      <div class="receipt">
        <input
          v-show="false"
          id="fileUpload"
          ref="fileUpload"
          type="file"
          name="fileUpload"
          @change="onFileUpload"
        >

        <div class="receipt__preview">
          <v-icon
            v-show="receipt"
            class="preview__undo elevation-2 pa-1"
            color="white"
            @click="handleClearUpload"
          >
            close
          </v-icon>

          <div
            class="preview__image"
            @click="handlePreviewImageClick"
          >
            <img
              v-if="receipt"
              id="preview__image"
              alt="receipt"
              class="preview__image-container"
            >

            <span v-else>no receipt</span>
          </div>
        </div>

        <div class="receipt__upload">
          <v-btn
            dark
            fab
            @click="$refs.fileUpload.click()"
          >
            <v-icon style="height: auto;">
              cloud_upload
            </v-icon>
          </v-btn>
          <v-chip
            small
          >
            upload receipt
          </v-chip>
        </div>
        <span />
      </div>

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
import { mapActions, mapGetters } from 'vuex';
import config from '../../config';
import notifications from '../../mixins/notifications';
import {
  EXPENSE,
  CREATE_EXPENSE,
} from '../../store/modules/expense-types';

import {
  TRANSACTION_TYPE,
  LIST_TRANSACTION_TYPES,
  GET_TRANSACTION_TYPES,
} from '../../store/modules/transactionType-types';

import {
  CATEGORY,
  LIST_CATEGORIES,
  GET_CATEGORIES,
} from '../../store/modules/category-types';

export default {
  name: 'CreateExpenseForm',
  mixins: [notifications],
  props: {
    fkPeriod: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    valid: true,
    fkTransactionType: '',
    fkCategory: '',
    title: '',
    titleRules: [
      v => !!v || 'this field is required',
    ],
    amount: '',
    amountRules: [
      v => !!v || 'this field is required',
    ],
    receipt: null,
    isFile: false,
  }),
  computed: {
    ...mapGetters(TRANSACTION_TYPE, {
      transactionTypes: GET_TRANSACTION_TYPES,
    }),
    ...mapGetters(CATEGORY, {
      categories: GET_CATEGORIES,
    }),
  },
  mounted() {
    this.listTransactionTypes();
    this.listCategories();
  },
  methods: {
    ...mapActions(EXPENSE, {
      createExpense: CREATE_EXPENSE,
    }),
    ...mapActions(TRANSACTION_TYPE, {
      listTransactionTypes: LIST_TRANSACTION_TYPES,
    }),
    ...mapActions(CATEGORY, {
      listCategories: LIST_CATEGORIES,
    }),
    handleSubmit() {
      if (this.$refs.form.validate()) {
        const expenseObj = {
          title: this.title,
          amount: this.amount,
          fkPeriod: this.fkPeriod,
          fkTransactionType: this.fkTransactionType,
          fkCategory: this.fkCategory,
          receipt: this.receipt,
        };
        this.createExpense(expenseObj);
        this.$refs.form.reset();
        this.$emit('close');
      } else {
        this.notifyError('Form is invalid!');
      }
    },
    handlePreviewImageClick() {
      if (!this.receipt) {
        this.$refs.fileUpload.click();
      }
    },
    onFileUpload(event) {
      const file = event.target.files[0];
      const { size, type } = file;

      if (size > config.MAX_ATTACHMENT_SIZE) {
        this.notifyError(`Please pick a file small than ${config.MAX_ATTACHMENT_SIZE / 1000000} Mb`);
        return;
      }

      if (!config.AUTHORIZED_FILE_TYPES.includes(type)) {
        this.notifyError('This type of file is not authorized');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const previewImage = document.getElementById('preview__image');
        previewImage.src = reader.result;
      };

      this.receipt = file;
      reader.readAsDataURL(file);
    },
    handleClearUpload() {
      this.receipt = null;
    },
  },

};
</script>

<style lang="scss" scoped>
.createExpenseForm {
  padding: 1.2rem;
}

.receipt {
  display: flex;

  &__preview {
    position: relative;

    .preview__undo {
      background-color: $dark;
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 0px;
    }

    .preview__image {
      width: 150px;
      height: 200px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $grey;

      &-container {
        max-width: 150px;
        max-height: 200px;
        object-fit: contain;
        width: auto;
        height: auto;
      }
    }
  }

  &__upload {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
}

.submit-button {
  margin-top: 1rem;

  &__text {
    color: $light;
    font-weight: bold;
  }
}
</style>
