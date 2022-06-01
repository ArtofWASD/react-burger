
export const checkResponse = ((res:Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
});

export const setCookie = (name: string, value: string, props: any) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const formatDate = (date: string): string => {
  const orderDate = new Date(date).setHours(0, 0, 0, 0);
  const currentDate = new Date().setHours(0, 0, 0, 0);
  let day = new Date(orderDate).toLocaleDateString("ru-RU", {});
  if (orderDate === currentDate) {
    day = "Сегодня";
  } else if (currentDate - orderDate === 24 * 60 * 60 * 1000) {
    day = "Вчера";
  }
  const time = new Date(date).toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
  return `${day}, ${time}`;
};
