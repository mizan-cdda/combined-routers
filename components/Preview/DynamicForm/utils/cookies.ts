// export const getCookie = (name: string) => {
//   const value = `; ${document.cookie}`;
//   const parts: any = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// };

export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

// export function getCookie(name) {
//   var nameEQ = name + '=';
//   var ca = document.cookie.split(';');
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

export const setCookie = (name: string, value: any, options = {} as any) => {
  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${name}=${encodeURIComponent(value)}`;
  for (let optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }
  document.cookie = updatedCookie;
};

export const getAllCookies = () => {
  const cookies: { [key: string]: string } = {};
  const allCookies = `; ${document.cookie}`;
  const cookieParts = allCookies.split('; ');

  for (let i = 0; i < cookieParts.length; i++) {
    const cookiePair = cookieParts[i].split('=');
    const cookieName = cookiePair[0];
    const cookieValue = cookiePair[1];
    cookies[cookieName] = cookieValue;
  }

  return cookies;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    expires: new Date(0)
  });
};
