import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';
import Searchbar from "../../components/Searchbar";

function getDate(date) {
    var curr = new Date(date);
    return curr.toISOString().substr(0, 10);
}

function ProjectEdit() {
    const [id, setId] = useState(useParams().id)
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [isSaving, setIsSaving] = useState(false)


    useEffect(() => {
        axios.get(`/api/user/${id}`)
            .then(function (response) {
                let user = response.data

                setName(user.name);
                setSurname(user.surname);
                setBirthDate(user.birthDate);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }, [])


    const handleSave = () => {
        setIsSaving(true);
        axios.patch(`/api/user/${id}`, {
            name: name,
            surname: surname,
            birthDate: birthDate
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Uživatel byl úspěšně aktualizován!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occured!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false)
            });
    }


    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Upravit Uživatele</h2>
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
                                <label htmlFor="birthDate">Datum narození</label>
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
                                className="btn btn-outline-success mt-3">
                                Upravit uživatele
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectEdit;