import Constants from 'expo-constants';
import UserHelper,{ UserLogoutHelper } from './user';


const BaseURL = Constants.expoConfig.extra.apiBaseUrl;
//console.log("BaseURL is:", BaseURL);


const GenericAPIHelper = {
  async GenericAPIGet(endpoint) {
    try {
      //console.log("TOKEN: ", UserHelper.token);
      const token = UserHelper.token;
      //console.log("Token", token);
      //console.log("Route", `${BaseURL}${endpoint}`);
      const response = await fetch(`${BaseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // If the token is expired for a earlor login, then it will logout the user 
      // and request that they login again.
      if (response.status == 401) {
        UserLogoutHelper.logout();
        throw new Error('Unauthorized access, Please login again to reauthenticate yourself.');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API GET request failed:', err);
      return null;
    }
  },
  async GenericAPIPost(endpoint, body) {
    try {
      const token = UserHelper.token;
      const response = await fetch(`${BaseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API POST request failed:', err);
      return null;
    }
  },
  async GenericAPIPut(endpoint, body) {
    try {
      const token = UserHelper.token;
      const response = await fetch(`${BaseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      //console.log("PUT Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error('API PUT request failed:', err);
      return null;
    }
  },
  async GenericAPIDelete(endpoint) {
    try {
      const token = UserHelper.token;
      const response = await fetch(`${BaseURL}${endpoint}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (response.status === 204) {
        return {};
      }

      const data = await response.text();
      return data ? JSON.parse(data) : {};
    } catch (err) {
      console.error('API DELETE request failed:', err);
      return null;
    }
  }
}





export default GenericAPIHelper;
