import React, {useState, useEffect, useMemo} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../../components/Layout"
import axios from 'axios';

function UserShow() {
    const [id, setId] = useState(useParams().id)
    const [user, setUser] = useState({name:'', surname:'', birthDate: null})
    useEffect(() => {
        axios.get(`/api/user/${id}`)
            .then(function (response) {
                setUser(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    let d = new Date(user.birthDate);
    let ye = new Intl.DateTimeFormat('cs', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('cs', { month: 'long' }).format(d);
    let da = new Intl.DateTimeFormat('cs', { day: '2-digit' }).format(d);
    let date = `${da} ${mo} ${ye}`;

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Zobrazit uživatele</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/users"> Zobrazit všechny uživatele
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Jméno:</b>
                        <p>{user.name}</p>
                        <b className="text-muted">Příjmení:</b>
                        <p>{user.surname}</p>
                        <b className="text-muted">Datum narození:</b>
                        <p>{date}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserShow;