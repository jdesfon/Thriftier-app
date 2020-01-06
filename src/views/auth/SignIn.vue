<template>
  <div class="signIn">
    <Header
      class="header"
      redirect="landing"
      logo
    />

    <form class="signIn__form">
      <CustomTextField
        v-model="email"
        autocomplete="email"
        placeholder="email"
        type="email"
      />

      <CustomTextField
        v-model="password"
        autocomplete="current-password"
        placeholder="password"
        type="password"
      />

      <button
        class="form__submit my-2 elevation-2"
        @click.prevent="handleSubmit"
      >
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_IN } from '../../store/modules/user-types';
import Header from '../../components/Header.vue';
import CustomTextField from '../../components/inputs/CustomTextField.vue';

export default {
  name: 'SignIn',
  components: {
    Header,
    CustomTextField,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    ...mapActions(USER, {
      signIn: SIGN_IN,
    }),
    handleSubmit() {
      this.signIn({
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>.signIn {
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
  color: $light;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .header {
    flex-grow: 1;
  }
  &__form {
    flex-grow: 1;
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
}
</style>
