import reducer, { initialState, logIn, logOut } from "./login";

const loginData = {
  success: true,
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  user: {
    email: "email",
    name: "name",
  },
};

describe("logIn", () => {
  test("Set data and loginState when logIn extraReducer is fulfilled", () => {
    const action = { type: logIn.fulfilled.type, payload: loginData, loginState: true };
    const state = reducer(initialState, action);
    expect(state).toEqual({ loginData, loginState: true });
  });
});

describe("logOut", () => {
  test("Set loginState to false when extraReducer logOut is fulfilled", () => {
    const action = { type: logOut.fulfilled.type, payload: { loginState: false } };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loginState: false });
  });
});

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual(initialState);
});
