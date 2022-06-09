import reducer, { initialState, reset, getIngridientItem, deleteIngridientItem } from "./get-data";

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual(initialState);
});

test("Should handler reset initialState", () => {

  expect(reducer(initialState, reset())).toEqual();
});
