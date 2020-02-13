import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SignUp = () => {
    const history = useHistory();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    let [cgv, setCgv] = useState(false);


    return (
        (<div className="max-wrapper">
            <div className="wrapper-signup">
                <div className="why">
                    <h2 className="signup-title">Pourquoi créer un compte ?</h2>
                    <div className="bloc">
                        <FontAwesomeIcon className="icon-xl" icon={['far', 'clock']} />
                        <div>
                            <h3>Gagnez du temps </h3>
                            <p>Publiez vos annonces rapidement, avec vos informations pré-remplies chaque fois que vous souhaitez déposer une nouvelle annonce.</p>
                        </div>
                    </div>
                    <div className="bloc">
                        <FontAwesomeIcon className="icon-xl" icon={['far', 'bell']} />
                        <div>
                            <h3>Soyez les premiers informés </h3>
                            <p>Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce qui vous intéresse.</p>
                        </div>
                    </div>
                    <div className="bloc">
                        <FontAwesomeIcon className="icon-xl" icon={['far', 'eye']} />
                        <div>
                            <h3>Visibilité </h3>
                            <p>Suivez les statistiques de vos annonces (nombre de fois où votre annonce a été vue, nombre de contacts reçus).</p>
                        </div>
                    </div>
                </div>
                <form className="signup-form" onSubmit={async (e) => {
                    e.preventDefault();
                    // let newUser = [...user];
                    const response = await axios.post("https://leboncoin-api.herokuapp.com/api/user/sign_up", { username: username, email: email, password: password, password1: password1 });
                    const token = response.data.token
                    Cookies.set("token", token, { expires: 7 });
                    console.log(response.data.token);
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setPassword1("");
                    history.push("/");
                }}>
                    <h2 className="signup-title">Créez un compte</h2>
                    <hr />
                    <div className="wrapper-input-signup">
                        <label>Pseudo *</label>
                        <input type="text" value={username} name="username" onChange={(e) => {
                            setUsername(e.target.value)
                        }} />
                        <label>Adresse email *</label>
                        <input type="email" value={email} name="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div>
                    <div className="password">
                        <label>Mot de passe *</label>
                        <input type="password" value={password} name="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <label>Confirmer le mot de passe *</label>
                        <input type="password" value={password1} name="password1" onChange={(e) => {
                            setPassword1(e.target.value)
                        }} />
                    </div>
                    <div className="cgv">
                        <input className="check" type="checkbox" checked={cgv ? true : false} onChange={() => {
                            cgv = !cgv;
                            setCgv(cgv)
                        }} />
                        <p>"J'accepte les <a href="#">Conditions Générales de Vente</a> et les <a href="#">Conditions Générales d'utilisation</a>"</p>
                    </div>
                    <button className="connect" type="submit">Créer mon Compte Personnel</button>
                </form>
            </div>
        </div>)
    );
}

export default SignUp;