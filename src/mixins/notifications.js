import { mapMutations } from 'vuex';
import {
  NOTIFICATION,
  NOTIFICATION_INFO,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
} from '../store/modules/notification-types';

export default {
  methods: {
    ...mapMutations(NOTIFICATION, {
      notifyInfo: NOTIFICATION_INFO,
      notifySuccess: NOTIFICATION_SUCCESS,
      notifyError: NOTIFICATION_ERROR,
    }),
  },
};
