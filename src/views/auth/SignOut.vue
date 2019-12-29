<template>
  <div class="signOut">
    <button
      class="form__submit my-2 elevation-2"
      @click.prevent="handleSubmit"
    >
      Sign out
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, SIGN_OUT } from '../../store/modules/user-types';

export default {
  name: 'SignOut',
  methods: {
    ...mapActions(USER, {
      signOut: SIGN_OUT,
    }),
    handleSubmit() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.signOut {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .form__submit {
      width: 50%;
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
