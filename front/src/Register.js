import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Link, useNavigate} from "react-router-dom";
import auth from "./api/auth";
import validation from "./util/validation";
import authAPI from "./api/auth";
import "./css/style.css"

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid : true
        }
        this.handleClickButton = this.handleClickButton.bind(this)
        this.registerRequest = this.registerRequest.bind(this)
        this.setValidState = this.setValidState.bind(this)
    }
    // navigate = useNavigate();

    setValidState(bool){
        this.setState({valid:bool})
        console.log(this)
    }

    handleClickButton(){
        const login = document.getElementById("loginField").value
        const text = document.getElementById("outText")
        const password1 = document.getElementById("passwordField1").value
        const password2 = document.getElementById("passwordField2").value
        console.log(this)
        let out = validation.validateLogin(login)

        if ( out !== "ok" ){
            text.innerText = out;
            this.setValidState(false)
            return;
        }

        out = validation.validatePass(password1)
        if (out !== "ok" ){
            text.innerText = out;
            this.setValidState(false)
            return;
        }
        if (password1 !== password2) {
            text.innerText = "passwords are different"
            this.setValidState(false)
            return;
        }
        this.setValidState(true)
        this.registerRequest(login.trim(),password1.trim())
    }


    registerRequest(login, password){

        console.log("login  " + login)
        console.log("passw  " + password)
        console.log(this.state.valid)
        console.log("do req")
        authAPI.register(login, password).then(response => {
            if (response.status === 200) {
                alert("you are registered")
                document.getElementById("hiddenInp").click()

                // useNavigate()
                // this.navigate("/")
                // useNavigate("/main")
            } else {
                // todo сделать красивые алерты
                alert("хз чо здесь писать")
            }
        }).catch(err => {
            alert(err.response.data)
        })

    }

    render() {
        return (
            <div className={"form-signin w-100 m-auto"}>
                <h3>Please Register</h3>
                <label>
                    <p>Login</p>
                    <input id={"loginField"} className={"form-control"} maxLength={50} type="text"  />
                </label>
                <p>Password</p>
                <label>

                    <input id={"passwordField1"}  className={"form-control"} maxLength={50} type="password"/>
                </label>
                <label>
                    <p>Repeat password</p>
                    <input id={"passwordField2"} className={"form-control"} maxLength={50} type="password"/>
                </label>
                <div>
                    <button className={"w-100 mt-3 btn btn-lg btn-primary"} onClick={this.handleClickButton}>Sign up</button>
                    <Hello/>
                </div>
                <div>
                    <label>
                        <p id={"outText"}></p>
                    </label>
                </div>
                <div>
                    <Link to={'/'}>Back</Link>
                </div>
            </div>
        )
    }

}
const Hello = () => {
    const navigate = useNavigate();
    const handleClick = () => navigate('/');

    return (
        <input id={"hiddenInp"} onClick={handleClick} type="hidden"/>
    );
};

export default Register;

