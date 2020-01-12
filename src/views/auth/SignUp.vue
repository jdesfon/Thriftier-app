<template>
  <div class="signUp">
    <Header
      class="header"
      redirect="landing"
      logo
    />

    <form class="signUp__form">
      <v-text-field
        v-model="email"
        box
        browser-autocomplete="email"
        autofocus
        label="Email"
        placeholder="email"
        type="email"
      />

      <v-text-field
        v-model="password"
        box
        label="Password"
        placeholder="password"
        type="password"
      />

      <v-text-field
        v-model="passwordConfirm"
        box
        label="Confirm password"
        placeholder="confirm your password"
        type="password"
      />

      <v-btn
        dark
        round
        block
        @click.prevent="handleSubmit"
      >
        sign up
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_UP } from '../../store/modules/user-types';
import Header from '../../components/Header.vue';

export default {
  name: 'SignUp',
  components: {
    Header,
  },
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
  }),
  methods: {
    ...mapActions(USER, {
      signUp: SIGN_UP,
    }),
    handleSubmit() {
      if (this.password === this.passwordConfirm) {
        this.signUp({
          email: this.email,
          password: this.password,
        }).then(() => {
          this.$router.push({ name: 'confirm' });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.signUp {
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
  color: $light;
  display: flex;
  flex-direction: column;

  .header {
    flex-grow: 1;
  }

  &__form {
    flex-grow: 1;
  }
}
</style>
