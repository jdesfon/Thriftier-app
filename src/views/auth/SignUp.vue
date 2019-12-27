<template>
  <div class="signUp">
    <Header
      class="header"
      redirect="home"
      logo
    />

    <form class="signIn__form">
      <CustomTextField
        v-model="email"
        class="elevation-3 my-2"
        placeholder="email"
        :type="email"
      />

      <CustomTextField
        v-model="email"
        class="elevation-3 my-2"
        placeholder="password"
        :type="password"
      />

      <CustomTextField
        v-model="email"
        class="elevation-3 my-2"
        placeholder="confirm password"
        :type="password"
      />

      <button class="form__submit my-2 elevation-2">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
import CustomTextField from '../../components/inputs/CustomTextField.vue';
import Header from '../../components/Header.vue';

export default {
  name: 'SignUp',
  components: {
    CustomTextField,
    Header,
  },
  data: () => ({
    email: '',
    password: '',
  }),
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
    justify-content: space-between;

    .title {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &__main {
        margin-left: 50px;
        font-size: 47px;
      }

      &__subtitle {
        font-size: 12px;
      }

      &::before {
        position: absolute;
        left: 0px;
        width: 50px;
        height: 50px;
        background-image: url('../../assets/img/thriftier-pig.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        content: '';
      }
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
