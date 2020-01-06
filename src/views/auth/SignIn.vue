<template>
  <div class="signIn">
    <Header
      class="header"
      redirect="landing"
      logo
    />

    <form class="signIn__form">
      <v-text-field
        v-model="email"
        autofocus
        box
        browser-autocomplete="email"
        dark
        label="Email"
        placeholder="enter your email"
        type="email"
      />

      <v-text-field
        v-model="password"
        box
        browser-autocomplete="current-password"
        dark
        label="Password"
        placeholder="enter your password"
        type="password"
      />

      <v-btn
        dark
        round
        block
        @click.prevent="handleSubmit"
      >
        sign in
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_IN } from '../../store/modules/user-types';
import Header from '../../components/Header.vue';

export default {
  name: 'SignIn',
  components: {
    Header,
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

<style lang="scss" scoped>
.signIn {
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
}
</style>
