import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Signup.css";

const SignUp = () => {
    const history = useHistory();

    // j'initialise tous mes état de formulaire
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    let [cgv, setCgv] = useState(false);


    return (
        <section>
            <div className="wrapper">
                <div className="wrapper-signup d-flex sp-between align-items">
                    <div className="left d-flex flex-column sp-around">
                        <h2 className="signup-title">Pourquoi créer un compte ?</h2>
                        <div className="bloc d-flex align-items">
                            <FontAwesomeIcon className="icon-xl" icon={['far', 'clock']} />
                            <div>
                                <h3>Gagnez du temps </h3>
                                <p>Publiez vos annonces rapidement, avec vos informations pré-remplies chaque fois que vous souhaitez déposer une nouvelle annonce.</p>
                            </div>
                        </div>
                        <div className="bloc d-flex align-items">
                            <FontAwesomeIcon className="icon-xl" icon={['far', 'bell']} />
                            <div>
                                <h3>Soyez les premiers informés </h3>
                                <p>Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce qui vous intéresse.</p>
                            </div>
                        </div>
                        <div className="bloc d-flex align-items">
                            <FontAwesomeIcon className="icon-xl" icon={['far', 'eye']} />
                            <div>
                                <h3>Visibilité </h3>
                                <p>Suivez les statistiques de vos annonces (nombre de fois où votre annonce a été vue, nombre de contacts reçus).</p>
                            </div>
                        </div>
                    </div>
                    <form className="signup-form d-flex flex-column sp-between" onSubmit={async (e) => {
                        e.preventDefault();
                        if (password === password1) { // si les mots de passe entrées sont identiques
                            if (cgv) { // si les conditions générales sont cochées
                                try { // alors j'essaie d'envoyer les infos nécessaires au serveur
                                    const response = await axios.post(
                                        "https://leboncoin-4lexandrine.herokuapp.com/user/sign_up",
                                        { username, email, password });

                                    if (response.data.token) { // si le serveur me renvoie un token
                                        const token = response.data.token;
                                        Cookies.set("token", token, { expires: 7 }); // je l'enregistre dans mes cookies
                                        Cookies.set("username", username, { expires: 7 })
                                        // console.log(response.data.token);
                                        // et je réinitialise tous mes états
                                        setUsername("");
                                        setEmail("");
                                        setPassword("");
                                        setPassword1("");
                                        history.push("/");
                                    }
                                } catch {
                                    alert("An error occured");
                                }
                            } else {
                                alert("Vous n'avez pas validé les Conditions Générales")
                            }
                        } else {
                            alert("Vos mots de passe ne sont pas identiques");
                        }
                    }}>
                        <h2 className="signup-title">Créez un compte</h2>
                        <div className="d-flex flex-column">
                            <label>Pseudo *</label>
                            <input type="text" value={username} name="username" onChange={(e) => {
                                setUsername(e.target.value)
                            }} />
                            <label>Adresse email *</label>
                            <input type="email" value={email} name="email" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                        </div>
                        <div className="d-flex flex-column">
                            <label>Mot de passe *</label>
                            <input type="password" value={password} name="password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                            <label>Confirmer le mot de passe *</label>
                            <input type="password" value={password1} name="password1" onChange={(e) => {
                                setPassword1(e.target.value)
                            }} />
                        </div>
                        <div className="cgv d-flex">
                            <input className="check" type="checkbox" checked={cgv ? true : false} onChange={() => {
                                // si mes cgv sont true alors passe les en false et inversement
                                cgv = !cgv;
                                setCgv(cgv)
                            }} />
                            <p>"J'accepte les <a href="!#">Conditions Générales de Vente</a> et les <a href="!#">Conditions Générales d'utilisation</a>"</p>
                        </div>
                        <button className="connect" type="submit">Créer mon Compte Personnel</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignUp;