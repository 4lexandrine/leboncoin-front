import React from "react";
import "./Publish.css";

const Publish = () => {
    return (
        <div className="wrapper">
            <form className="publish-form d-flex flex-column align-items">
                <h2>Déposer une annonce</h2>
                <div className="d-flex flex-column">
                    <label>Titre de l'annonce *</label>
                    <input type="text" />
                    <label>Texte de l'annonce *</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <label>Prix *</label>
                    <div>
                        <input type="number" />
                        <span> €</span>
                    </div>
                    <label>Photo *</label>
                    <div>
                        <button className=" btn-xs">Choose file</button>
                        <span className="hidden">No file chosen</span>
                    </div>
                </div>
                <button type="submit" className="blue-btn">Valider</button>
            </form>
        </div>
    );
}

export default Publish;