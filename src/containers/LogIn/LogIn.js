import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.css";

const LogIn = ({ onLog }) => {
    const history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <section>
            <div className="d-flex justify-center wrapper">
                <form className="d-flex flex-column justify-center align-items login-form"
                    onSubmit={async (e) => {
                        try {
                            e.preventDefault();
                            const response = await axios.post(
                                process.env.REACT_APP_URL + "user/log_in",
                                { email, password });
                            if (response.data.token) {
                                onLog(response.data.token, response.data.username);
                                setEmail("");
                                setPassword("");
                                history.push("/");
                            } else {
                                alert("token is missing");
                            }
                        } catch (error) {
                            alert("An error occured");
                        }
                    }}>
                    <h2>Connexion</h2>
                    <div className="d-flex flex-column">
                        <label>Adresse email</label>
                        <input type="email" value={email} name="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                        <label>Mot de passe</label>
                        <input type="password" value={password} name="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <button className="blue-btn" type="submit">Se connecter</button>
                        <div className="hr"></div>
                    </div>
                    <p>Vous n'avez pas de compte ?</p>
                    <button className="create-account" onClick={() => {
                        history.push("/user/sign_up");
                    }}>Créer un compte</button>
                </form>
            </div>
        </section>
    );
}

export default LogIn;