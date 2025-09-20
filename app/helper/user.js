import {router} from "expo-router";
import * as Crypto from 'expo-crypto';
import GenericAPIHelper from './GenericAPIHelper';
import {LoginAPIHelper} from './LoginHelper.js';
import { useRouter } from 'expo-router';


export default class UserHelper {
  static email = "";
  static firstname = "";
  static lastname = "";
  static phonenumber = "";
  static id = null;
  static token = "";
}



const UserLoginHelper = {
  async login(username, password) {
    try {
      // API call would use username + password
      var response = await LoginAPIHelper.LoginToken('/users/login', { email: username, password: password });
      

      if (response && response.token) {
        UserHelper.email = username;
        UserHelper.token = response.token;
        UserHelper.firstname = response.user.firstname;
        UserHelper.lastname = response.user.lastname;
        UserHelper.phonenumber = response.user.phonenumber;
        UserHelper.id = response.user.id;

        console.log("UserHelper after login:", UserHelper);

        router.push('/pages/Events');

        console.log(UserHelper.email);
        console.log(UserHelper.token);
        console.log(UserHelper.firstname);
        console.log(UserHelper.lastname);
        console.log(UserHelper.phonenumber);
        console.log(UserHelper.id);

        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  }
};

const hashPassword = async (password) => {
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hashed;
};

const UserCreateAccountHelper = {
  async createAccount(
    firstname,
    lastname,
    email,
    phonenumber,
    password,
    state,
    city,
    zip, 
    address) {
    try {

      password = await hashPassword(password);
      // API call would use the provided details
      console.log("Hashed password:", password);

      const worked = true; // replace with API result

      console.log("Account creation worked:", worked);

      if (worked) {
        goToLogin(); 
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Account creation failed:", err);
      return false;
    }
  }
};



const UserLogoutHelper = {
  logout: function () {
    UserHelper.email = "";
    UserHelper.firstname = "";
    UserHelper.lastname = "";
    UserHelper.phonenumber = "";
    UserHelper.id = null;
    UserHelper.token = "";

    router.replace("/");
  }
};


const goToSignup = () => {
  router.push('pages/CreateAccountPage');
};

const goToLogin = () => {
  router.back('/index.tsx');
};


export { UserLoginHelper, UserLogoutHelper, goToSignup, goToLogin, UserCreateAccountHelper };
