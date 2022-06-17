import reducer, { initialState, getUserData } from "./user-Info";

describe("userInfo reducer", () => {

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should get user data then getUserData reducer is fulfilled", () => {
    const action = { type: getUserData.fulfilled.type, payload: { success: true, user: { name: "name", email: "email" } } };
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userData: { success: true, user: { name: "name", email: "email" } }, userState: true });
  });
  
  it("should not get user data then getUserData reducer is rejected", () => {
    const action = { type: getUserData.rejected.type};
    const state = reducer(initialState, action);
    expect(state).toEqual({ ...initialState, userData: { success: false, user: {} }, userState: false });
  });
});
