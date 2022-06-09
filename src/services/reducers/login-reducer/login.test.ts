import reducer, {initialState, logIn, logOut} from './login'

test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });