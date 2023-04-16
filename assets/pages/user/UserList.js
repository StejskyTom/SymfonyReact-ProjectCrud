import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function UserList() {
    const  [userList, setUserList] = useState([])

    useEffect(() => {
        fetchUserList()
    }, [])

    const fetchUserList = () => {
        axios.get('/api/user')
            .then(function (response) {
                setUserList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Smazat uživatele?',
            text: "Tuto akci nelze vrátit zpět!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Zrušit',
            confirmButtonText: 'Ano, smazat!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/user/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Uživatel byl smazán!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchUserList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Nelze smazat uživatele!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Řízení projektů - React</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/users/create">Přidat uživatele
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Jméno</th>
                                <th>Příjmení</th>
                                <th width="350px">Akce</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userList.map((user, key)=>{
                                return (
                                    <tr key={key}>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>
                                            <Link
                                                to={`/users/show/${user.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Zobrazit
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/users/edit/${user.id}`}>
                                                Upravit
                                            </Link>
                                            <button
                                                onClick={()=>handleDelete(user.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Smazat
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserList;