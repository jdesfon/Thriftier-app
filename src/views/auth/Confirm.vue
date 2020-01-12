<template>
  <div class="confirm">
    <Header
      class="header"
      redirect="landing"
      logo
    />
    <form class="confirm__form">
      <p>Your have received a confirmation code at your email address</p>
      <v-text-field
        v-model="code"
        autofocus
        background-color="dark"
        outline
        label="confirmation code"
        placeholder="XXXXXX"
      />

      <v-btn
        dark
        round
        block
        @click.prevent="handleSubmit"
      >
        confirm
      </v-btn>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { USER, CONFIRM_EMAIL } from '../../store/modules/user-types';
import Header from '../../components/Header.vue';

export default {
  name: 'Confirm',
  components: {
    Header,
  },
  data: () => ({
    code: '',
  }),
  methods: {
    ...mapActions(USER, {
      confirmEmail: CONFIRM_EMAIL,
    }),
    handleSubmit() {
      this.confirmEmail({ code: this.code }).then(() => {
        this.$router.replace({ name: 'home' });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.confirm {
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 1rem 2rem;
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
