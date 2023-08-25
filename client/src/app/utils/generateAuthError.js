export function generateAuthError(message) {
  switch (message) {
    case 'INVALID_PASSWORD':
      return 'Не верный пароль'
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      return 'Слишком много попыток ввода, попробуйте позже'
    case 'EMAIL_EXISTS':
      return 'Пользователь с такой почтой уже зарегистрирован или не зарегистрирован'
    case 'INVALID_EMAIL':
      return 'Не верная почта'
    default:
  }
}
