export function validator(data, config) {
  const errors = {}
  function validate(validateMetod, data, config) {
    let statusValidate
    switch (validateMetod) {
      case 'isRequared': {
        if (typeof data === 'boolean') {
          statusValidate = data
        } else {
          statusValidate = data.trim() === ''
        }
        break
      }
      case 'isEmail': {
        const emailregExp = /^\S+@\S+\.\S+$/g
        statusValidate = !emailregExp.test(data)
        break
      }
      case 'isCapitalSymbol': {
        const capitalregExp = /[A-Z]+/g
        statusValidate = !capitalregExp.test(data)
        break
      }
      case 'isContainDigit': {
        const digitregExp = /[0-9]+/g
        statusValidate = !digitregExp.test(data)
        break
      }
      case 'minWord': {
        statusValidate = data.length < config.value
        break
      }

      default:
        break
    }
    if (statusValidate) return config.message
  }
  for (const fieldName in data) {
    for (const validateMetod in config[fieldName]) {
      const error = validate(
        validateMetod,
        data[fieldName],
        config[fieldName][validateMetod]
      )
      if (error && !errors[fieldName]) {
        errors[fieldName] = error
      }
    }
  }
  return errors
}
