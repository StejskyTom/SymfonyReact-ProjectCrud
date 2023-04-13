import React, {useState} from 'react';
import { Link } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function UserCreate() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true);
        let formData = new FormData()
        formData.append("name", name)
        formData.append("surname", surname)
        formData.append("birthDate", birthDate)
        axios.post('/api/user', formData)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Uživatel byl přidán!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setName('')
                setSurname('')
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Nepodařilo se vytvořit uživatele!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Přidat uživatele</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/users">Zobrazit všechny uživatele
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Jméno</label>
                                <input
                                    onChange={(event)=>{setName(event.target.value)}}
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="surname">Příjmení</label>
                                <input
                                    onChange={(event)=>{setSurname(event.target.value)}}
                                    value={surname}
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    name="surname"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="birthDate">Příjmení</label>
                                <input
                                    onChange={(event)=>{setBirthDate(event.target.value)}}
                                    value={birthDate}
                                    type="date"
                                    className="form-control"
                                    id="birthDate"
                                    name="birthDate"/>
                            </div>
                            <button
                                disabled={isSaving}
                                onClick={handleSave}
                                type="button"
                                className="btn btn-outline-primary mt-3">
                                Přidat uživatele
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserCreate;