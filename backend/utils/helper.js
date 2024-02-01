exports.validateEmail = (email) =>{
    const emailRej = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!email.match(emailRej)) {
        return false
    } else {
        return true
    }
}

exports.validatePassword = (password) =>{
    const passwordRej = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!password.match(passwordRej)) {
        return false
    } else {
        return true
    }
}

exports.validatePhoneNumber = (phoneNumber) =>{
    const phoneNumberRej = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if (!phoneNumber.match(phoneNumberRej)) {
        return false
    } else {
        return true
    }
}