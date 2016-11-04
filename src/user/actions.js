export function submitLoginCredentials(email, password) {
    return {
        type: 'LOGIN_USER',
        data: {
          email: email,
          password: password
        }
    };
}