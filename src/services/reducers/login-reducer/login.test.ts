import { checkResponse } from "../../../utils/handler-functions";
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
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ status: "OK" }),
          ok: true,
        })
      ) as jest.Mock
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // it("should login", async () => {
  //   const result = await logIn({ email: "email", password: "password" });
  //   console.log(result);

  //   // expect(fetch).toHaveBeenCalledTimes(1);
  //   expect(result).toEqual(loginData);
  // });

  it("Set data and loginState when logIn extraReducer is fulfilled", () => {
    const action = { type: logIn.fulfilled.type, payload: loginData, loginState: true };
    const state = reducer(initialState, action);
    expect(state).toEqual({ loginData, loginState: true });
  });
  
  it("Set loginState to false when logOut extraReducer is rejected", () => {
    const action = { type: logOut.rejected.type, payload: "error", loginState: false };
    const state = reducer(initialState, action);
    expect(state).toEqual({ loginData: null, loginState: false });
  });
});

describe("logOut", () => {
  it("Set loginState to false when extraReducer logOut is fulfilled", () => {
    const action = { type: logOut.fulfilled.type, payload: { loginState: false } };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, loginState: false });
  });
});

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual(initialState);
});
