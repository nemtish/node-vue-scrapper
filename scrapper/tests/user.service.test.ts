const userService = require("../src/services/user.service");

describe("Test user service", () => {
  it("should save user", () => {
    const user = userService.saveUser({
      email: "test@mail.com",
      password: "test",
    });
    expect(userService.userStorage[user.email]).toBe(user);
    expect(user).toHaveProperty("id");
  });

  it("should thrown an error when user exist", () => {
    expect(() => {
      userService.saveUser({
        email: "test@mail.com",
        password: "test",
      });
    }).toThrow("User exist");
  });

  it("should find the user by email", () => {
    const email = "test@mail.com";
    const user = userService.findUserByEmail(email);
    expect(user.email).toEqual(email);
  });

  it("should authorize user and return token", () => {
    const reqData = { email: "test@mail.com", password: "test" };
    const token = userService.authorize(reqData);
    expect(token).toBeDefined();
  });

  it("should throw error on authorization when wrong credentials provided", () => {
    const user = { email: "test@mail.com", password: "test123" };
    expect(() => {
      userService.authorize(user);
    }).toThrow("Wrong email / password");
  });
});
