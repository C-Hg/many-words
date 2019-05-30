import { fetch } from "whatwg-fetch";

const services = {
  async socialLogin(provider, token) {
    const options = {
      method: "get",
      headers: {
        access_token: token,
        "Content-type": "text/plain"
      }
    };
    const result = await fetch(`/auth/${provider}/token`, options);
    return result.json();
  },

  async getJSONResponse(url) {
    const result = await fetch(url);
    return result.json();
  },

  async getTextResponse(url) {
    const result = await fetch(url);
    return result.text();
  },

  async postJSONResponse(url, data) {
    const options = {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    };
    const result = await fetch(url, options);
    return result.json();
  }
};

export default services;
