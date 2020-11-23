/* eslint-disable @typescript-eslint/no-explicit-any */
import { CookieOptions } from "express";

import craftAccessToken from "./jwt/craftAccessToken";
import craftRefreshToken from "./jwt/craftRefreshToken";
import setCookies, { Cookies } from "./setCookies";

import { CLIENTS } from "../constants";

// Mocking res.cookie function to ensure it is properly called, with the right parameters

let cookieName: string;
let cookieValue: string;
let cookieOptions: CookieOptions;
const mockSetCookie = jest.fn(
  (name: string, value: string, options: CookieOptions) => {
    cookieName = name;
    cookieValue = value;
    cookieOptions = options;
  }
);

const res: any = {
  cookie: mockSetCookie,
};

describe("setCookies", () => {
  it("should set cookie with res.cookie", async () => {
    const accessToken = await craftAccessToken("randomId", CLIENTS.web);
    const refreshToken = await craftRefreshToken("randomId");
    setCookies(res, accessToken, refreshToken);
    expect(mockSetCookie).toBeCalledTimes(2);
    expect(cookieName).toEqual(Cookies.refreshToken);
    expect(cookieValue).toEqual(refreshToken);
    expect(cookieOptions.expires).toBeDefined();
    expect(cookieOptions.httpOnly).toEqual(true);
    expect(cookieOptions.secure).toBeDefined();
  });
});
