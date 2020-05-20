import generateTotp from "./generateTotp";

describe("generateTotp", () => {
  it("should return a 6 characters string totp", () => {
    const totp = generateTotp();
    expect(typeof totp).toBe("number");
    expect(totp).toBeLessThanOrEqual(999999);
    expect(totp).toBeGreaterThanOrEqual(100000);
  });
});
