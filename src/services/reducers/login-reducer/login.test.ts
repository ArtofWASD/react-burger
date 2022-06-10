import reducer, {initialState, logIn, logOut} from './login'

const loginData = {
    success: true,
    accessToken:'accessToken',
    refreshToken:'refreshToken',
    user:{
      email: 'email',
      name: 'name',
    },
  loginState:true
}

// describe('login', () => {
//   describe('reducers', () => {
//     it('reducer fulfilled', () => {
//       const action = {type: logIn.fulfilled.type, payload:{loginData}};
//       const state = reducer(initialState, action);
//       expect(state).toEqual(loginData)
      
//     })
//   })
// })


test("Should return the initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });