export function login (email) {
    return {
      type: 'LOGIN',
      payload: email
    }
  }
  
  export function logout () {
    return {
      type: 'LOGOUT'
    }
}