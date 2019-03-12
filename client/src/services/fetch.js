import "whatwg-fetch";

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
    return await result.json();
  },

  async get(url) {
    const result = await fetch(url);
    return await result.json();
  }
};

export default services;
