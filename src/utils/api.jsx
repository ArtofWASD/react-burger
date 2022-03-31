import { API_URL } from "./api-constant";

export const getIngridients = () => {
  return fetch(`${API_URL}/ingredients`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Не пришёл ответ от сервера");
    })
    .then((data) => {
      if (data.success) return data.data;
    });
};

export const postOrder = (order) => {
  return fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Не пришёл ответ от сервера");
    })
    .then((result) => {
      if (result.success) {
        return result.order.number;
      }
      throw new Error("Не пришёл номер заказа");
    })
    .catch((e) => console.error(e));
};
export const Orders = "https://norma.nomoreparties.space/api/orders";
