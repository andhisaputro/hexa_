import jsHttpCookie from 'cookie';

export function checkIsLogin(cookies){
  if (typeof cookies === 'string') {
    cookies = jsHttpCookie.parse(cookies);
    if(cookies === null || cookies === undefined){
        return false
    }
        return true
  }
}

export function saluation(number){
  switch (number) {
    case 1:
      return 'Ms'
      break;
    case 2:
      return 'Mrs'
      break;
    default:
    return 'Mr'
  }
}
