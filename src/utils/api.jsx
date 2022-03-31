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
      if (data.success) 
        return data.data;
    })    
};

export const Ingridients = "https://norma.nomoreparties.space/api/ingredients";
export const Orders = "https://norma.nomoreparties.space/api/orders";
