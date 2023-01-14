const validation = {
    validateLogin(login){
        if (login == null){
            return "login can not be empty"
        }
        const lg = login.trim();

        if (lg === "" ){
            return "login can not be empty"
        }
        if (lg.includes(" ")){
            return "login can not contains whitespace"
        }
        return "ok"
    },

    validatePass(password){
        if (password == null){
            return "password can not be empty"
        }
        const pass = password.trim()
        if (pass.length < 8){
            return "password must be at least 8 characters"
        }
        if (pass === ""){
            return "password can not be empty"
        }
        if (pass.includes(" ")){
            return "password can not contains whitespace"
        }
        return "ok"

    },

    validateY(Y){
    // if (hasLetter(Y)){
    //     return false
    // }
    // let y = Y.replace(",",".")
    let y = Y
    // console.log(y)
    // let y = parseFloat(Y)
    if(y === parseFloat(y).toString()) {
        if (y < -5 || y > 5 || Number.isNaN(y)) {
            return false
        }
        return true
    }
    return false
}


}
export default validation;