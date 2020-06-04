/* eslint-disable @typescript-eslint/no-explicit-any */
import { CookieOptions } from "express";

import craftAccessToken from "./jwt/craftAccessToken";
import setAccessCookie from "./setAccessCookie";

import { CLIENTS } from "../constants";

// Mocking res.cookie function to ensure it is properly called, with the right parameters

let cookieName: string;
let cookieValue: string;
let cookieOptions: any;
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

describe("setAccessCookie", () => {
  it("should set cookie with res.cookie", async () => {
    const accessToken = await craftAccessToken("randomId", CLIENTS.web);
    setAccessCookie(res, accessToken);
    expect(mockSetCookie).toBeCalledTimes(1);
    expect(cookieName).toEqual("access_token");
    expect(cookieValue).toEqual(accessToken);
    expect(cookieOptions.expires).toBeDefined();
    expect(cookieOptions.httpOnly).toEqual(true);
    expect(cookieOptions.secure).toBeDefined();
  });
});
