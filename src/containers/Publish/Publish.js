import React, { useState } from "react";
import axios from "axios";
import "./Publish.css";
import { useHistory } from "react-router-dom";
import Dropzone from "../../components/Dropzone/Dropzone";

const Publish = ({ user, file, setFile }) => {
    const history = useHistory();


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    return (
        <div className="wrapper">
            <form className="publish-form d-flex flex-column align-items" onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData();

                // Dans formData, on aura des fichiers et aussi des variables de type string, number, object, etc.
                formData.append("title", title);
                formData.append("description", description);
                formData.append("price", price);
                formData.append("picture", file);
                try {
                    const response = await axios.post(
                        "https://leboncoin-4lexandrine.herokuapp.com/offer/publish",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${user.token}`,
                                "Content-Type": "multipart/form-data"
                            }
                        }
                    );
                    history.push("/");
                } catch (error) {
                    if (error.response.status === 500) {
                        console.error("An error occurred");
                    } else {
                        console.error(error.response.data.msg);
                    }
                }
            }}>
                <h2>Déposer une annonce</h2>
                <div className="d-flex flex-column">
                    <label>Titre de l'annonce *</label>
                    <input type="text" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                    <label>Texte de l'annonce *</label>
                    <textarea name="" id="" cols="30" rows="10" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}></textarea>
                    <label>Prix *</label>
                    <div>
                        <input type="number" value={price} onChange={(e) => {
                            setPrice(e.target.value)
                        }} />
                        <span> €</span>
                    </div>
                    <label>Photo *</label>
                    {/* <Dropzone setFile={setFile} file={file} /> */}
                    <div>
                        <input className="file" type="file" onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}></input>
                    </div>
                </div>
                <button type="submit" className="blue-btn">Valider</button>
            </form>
        </div>
    );
}

export default Publish;