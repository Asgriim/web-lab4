import {Link, Navigate, useNavigate} from "react-router-dom";
import validation from "./util/validation";
import authAPI from "./api/auth";
import React from "react";
import "./css/style.css"
import Main from "./Main";
function LogIn(){
    // navigate = useNavigate();

   function handleClickButton(){
        const login = document.getElementById("loginField").value
        const text = document.getElementById("outText")
        const password1 = document.getElementById("passwordField1").value
        let out = validation.validateLogin(login)

        if ( out !== "ok" ){
            text.innerText = out;
            return;
        }

        out = validation.validatePass(password1)
        if (out !== "ok" ){
            text.innerText = out;
            return;
        }
        loginRequest(login.trim(),password1.trim())
    }


    function loginRequest(login, password){
        console.log("login  " + login)
        console.log("passw  " + password)
        console.log("do req")
        authAPI.login(login, password).then(response => {
            if (response.status === 200) {
                localStorage.setItem("userLogin", response.data.username)
                localStorage.setItem("userToken", response.data.jwt)
                localStorage.setItem("signIn","true")
                document.getElementById("hiddenInp").click()


            } else {
                // todo сделать красивые алерты
                alert("хз чо здесь писать")
            }
        }).catch(err => {
            alert(err.response.data)
        })

    }
    let logeed = localStorage.getItem("signIn") === "true";
    if (logeed){
        return <Navigate to={"/main"} replace={true}/>
    }
    return (

            <div className={"form-signin w-100 m-auto"}>

                <h3 >Please sign in</h3>
                <div>
                    <p>Login</p>
                    <label>
                        <input id={"loginField"} className={"form-control"} maxLength={50} type="text"/>
                    </label>
                    <p>Password</p>
                    <label>
                        <input id={"passwordField1"}  className={"form-control"}  maxLength={50} type="password"/>
                    </label>
                    <div>
                        <button className={"w-100 mt-3 btn btn-lg btn-primary"} onClick={handleClickButton}>Sign in</button>
                        <Hello/>
                    </div>
                    <div>
                        <label >
                            <p className={"err-label"} id={"outText"}></p>
                        </label>
                    </div>
                    <div>
                        <Link to={'/register'}>Register</Link>
                    </div>
                </div>
            </div>
        )


}
const Hello = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/Main');

    return (
        <input id={"hiddenInp"} onClick={handleClick} type="hidden"/>
    );
};

export default LogIn;
