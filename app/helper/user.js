export default class UserHelper {
  static email = "";
  static firstname = "";
  static lastname = "";
  static phonenumber = "";
  static id = null;
  static token = "";
}

const UserLoginHelper = {
  Username: "",
  Password: "",

  // then this will do all the api helper stuff to login the user
  // and then will return true or false and set the UserHelper static variables
  login: async function () {
    // do the api call here
    // if success set the UserHelper static variables
    // if fail return false
    return true;
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


export { UserLoginHelper, UserLogoutHelper };
