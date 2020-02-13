import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const LogIn = ({ setUser }) => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="wrapper-form">
            <form className="login-form" onSubmit={async (e) => {
                e.preventDefault();
                const response = await axios.post("https://leboncoin-api.herokuapp.com/api/user/log_in", { email: email, password: password });
                const token = response.data.token
                Cookies.set("token", token, { expires: 7 });
                setUser(token);
                console.log(response.data.token);
                setEmail("");
                setPassword("");
                history.push("/");
            }}>
                <h2>Connexion</h2>
                <hr />
                <div className="wrapper-input-form">
                    <label>Adresse email</label>
                    <input type="email" value={email} name="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <label>Mot de passe</label>
                    <input type="password" value={password} name="password" onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button className="connect" type="submit">Se connecter</button>
                </div>
                <hr />
                <button className="create-account" onClick={() => {
                    history.push("/user/sign_up");

                }}>Créer un compte</button>
            </form>
        </div>);
}

export default LogIn;