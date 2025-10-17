import Toast from 'react-native-toast-message';

// the toast generic notifications for the application.
// you will have to pass your message as a string in the onSuccess, or onError functions
const NotifyMessages = {
  async notifySuccess(message) {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  },
  async notifyError(message) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  },
  async notifyInfo(message) {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  },
  async notifyWarning(message) {
    Toast.show({
      type: 'info',
      text1: 'Warning',
      text2: message,
      position: 'bottom',
      visibilityTime: 3000,
    });
  }
}



export default NotifyMessages;
