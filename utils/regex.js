const validateEmail = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexEmail.test(email.toLowerCase())
};

const validatePassword = (password) => {
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_\-])(?=.{8,})/
    return regexPassword.test(password)
};

const validateImg = (url) => {
    const regexUrl = /^https?:\/\/[^\s]+?\.(jpg|png)(\?.*)?$/i
    const regexRutaLocal = /^\/?uploads\/[^\s]+?\.(jpg|png)$/i;
    return regexUrl.test(url) || regexRutaLocal.test(url)
}

const regex = {
    validateEmail,
    validatePassword,
    validateImg
};

module.exports = regex;