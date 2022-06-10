import reducer, {
  initialState,
  reset,
  getIngridientItem,
  deleteIngridientItem,
  addIngridientItem,
  resetConstructor,
  updateIngridient,
  addBunItem,
} from "./get-data";

const ingredient = {
  _id: "60d3b41abdacab0026a733c9",
  name: "Мясо бессмертных моллюсков Protostomia",
  type: "main",
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: "https://code.s3.yandex.net/react/code/meat-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-02-large.png",
  __v: 0,
};

const bun = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0,
};

test("Should return the initial state", () => {
  expect(reducer(undefined, { type: "" })).toEqual(initialState);
});

test("Should handler reset initialState", () => {
  expect(reducer(initialState, reset())).toEqual(initialState);
});

test("Should handler reset constructor state", () => {
  expect(reducer(initialState, resetConstructor())).toEqual(initialState);
});

test("Should ingredient item get in modalState", () => {
  expect(reducer(initialState, getIngridientItem(ingredient))).toEqual({
    ...initialState,
    ingridientItem: ingredient,
  });
});

test("Should ingredient item add on constructor", () => {
  expect(reducer(initialState, addIngridientItem(ingredient))).toEqual({
    ...initialState,
    constructor: { buns: [], ingridients: [ingredient] },
    orderIngridients: [ingredient._id],
    total: ingredient.price,
    counter: [{ _id: ingredient._id, count: 1 }],
  });
});

test("Should bun item add on constructor", () => {
  expect(reducer(initialState, addBunItem(bun))).toEqual({
    ...initialState,
    constructor: { buns: [bun], ingridients: [] },
    orderIngridients: [bun._id],
    total: bun.price * 2,
    counter: [{ _id: bun._id, count: 1 }],
  });
});

test("Should update ingredient item", () => {
  expect(reducer(initialState, updateIngridient([ingredient]))).toEqual({
    ...initialState,
    constructor: { buns: [], ingridients: [ingredient] },
  });
});

test("Should delete ingredient from constructor", () => {
  expect(reducer(initialState, deleteIngridientItem(ingredient))).toEqual({ ...initialState, constructor: { buns: [], ingridients: [] } });
});
