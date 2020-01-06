<template>
  <div class="confirm">
    <Header
      redirect="landing"
      logo
    />
    <form>
      <CustomTextField
        v-model="code"
        class="elevation-3 my-2"
        placeholder="email confirmation code"
      />

      <button
        class="form__submit my-2 elevation-2"
        @click.prevent="handleSubmit"
      >
        confirm
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, CONFIRM_EMAIL } from '../../store/modules/user-types';
import Header from '../../components/Header.vue';
import CustomTextField from '../../components/inputs/CustomTextField.vue';

export default {
  name: 'Confirm',
  components: {
    Header,
    CustomTextField,
  },
  data: () => ({
    code: '',
  }),
  methods: {
    ...mapActions(USER, {
      confirmEmail: CONFIRM_EMAIL,
    }),
    handleSubmit() {
      this.confirmEmail({ code: this.code });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm {
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
  color: $light;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.form__submit {
  width: 100%;
  height: 5rem;
  text-align: center;
  border: 0.2rem solid $light;
  font-size: 1.4rem;
  font-weight: 600;
  border-radius: 5rem;
  text-transform: uppercase;
  background-color: $blue;
  color: $light;

  &:hover {
    background-color: $light;
    color: $blue;
    transition: background-color 200ms ease-in-out;
  }
}
</style>
