<template>
  <v-dialog
    v-model="isConfirmDialogVisible"
    width="300"
  >
    <div class="baseConfirmDialog">
      <p class="baseConfirmDialog__content">
        {{ message }}
      </p>
      <div class="baseConfirmDialog__actions">
        <v-btn
          class="ma-0"
          dark
          block
          @click="handleYes"
        >
          yes
        </v-btn>
        <v-btn
          class="ma-0"
          dark
          @click="handleNo"
        >
          no
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'BaseConfirmDialog',
  props: {
    message: {
      type: String,
      default: () => 'Do you really want to do this ?',
    },
    isConfirmDialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleYes() {
      this.$emit('yes');
    },
    handleNo() {
      this.$emit('no');
    },
  },
};
</script>

<style lang="scss">
.baseConfirmDialog {
    background-color: $light;
    max-width: 300px;

    &__content {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2rem;
        font-size: 1.3rem;
    }

    &__actions {
        display: flex;
        justify-content: center;
    }
}
</style>
