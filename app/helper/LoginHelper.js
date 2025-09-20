import Constants from 'expo-constants';

const BaseURL = Constants.expoConfig.extra.apiBaseUrl;
console.log("BaseURL is:", BaseURL);

export const LoginAPIHelper = {
  async LoginToken(endpoint, bodyData) {
    const fullURL = `${BaseURL}${endpoint}`;
    console.log("LoginAPIHelper called with:", endpoint, bodyData);
    console.log("Full URL is:", fullURL);

    try {
      const response = await fetch(fullURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // optional: see backend message
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json(); // parse JSON
      console.log("Login response:", data);
      return data;
    } catch (err) {
      console.error("API POST request failed:", err);
      return null;
    }
  },
};

