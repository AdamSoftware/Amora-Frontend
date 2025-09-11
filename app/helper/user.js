import {router} from "expo-router";
import * as Crypto from 'expo-crypto';


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
      console.log("Logging in with:", username, password);

      const worked = true; // replace with API result

      console.log("Login worked:", worked);
      console.log("username:", username);
      console.log("password:", password);

      if (worked) {
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

    // return you back to the login page / index page
    window.location.href = "/";
  }
};


const goToSignup = () => {
  router.push('pages/CreateAccountPage');
};

const goToLogin = () => {
  router.back('/index.tsx');
};


export { UserLoginHelper, UserLogoutHelper, goToSignup, goToLogin, UserCreateAccountHelper };
