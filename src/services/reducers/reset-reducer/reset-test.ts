import reducer, { postResetForm } from "./reset";

describe("reset reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual({
      status: false,
    });
  });

  it("set reset state to true while postResetForm is fulfilled", () => {
    const action = { type: postResetForm.fulfilled.type, payload: { status: true } };
    const state = reducer({ status: false }, action);
    expect(state).toEqual({ status: true });
  });

  it("set reset state to false while postResetForm is rejected", () => {
    const action = { type: postResetForm.rejected.type };
    const state = reducer({ status: false }, action);
    expect(state).toEqual({ status: false });
  });
});
