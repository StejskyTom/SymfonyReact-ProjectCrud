import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function ProjectList() {
    const  [projectList, setProjectList] = useState([])

    useEffect(() => {
        fetchProjectList()
    }, [])

    const fetchProjectList = () => {
        axios.get('/api/project')
            .then(function (response) {
                setProjectList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Smazat projekt?',
            text: "Tuto akci nelze vrátit zpět!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Zrušit',
            confirmButtonText: 'Ano, smazat!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/project/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Project deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchProjectList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
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
                            to="/create">Vytvořit nový projekt
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Název</th>
                                <th>Popis</th>
                                <th width="240px">Akce</th>
                            </tr>
                            </thead>
                            <tbody>
                            {projectList.map((project, key)=>{
                                return (
                                    <tr key={key}>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td>
                                            <Link
                                                to={`/show/${project.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Zobrazit
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${project.id}`}>
                                                Upravit
                                            </Link>
                                            <button
                                                onClick={()=>handleDelete(project.id)}
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

export default ProjectList;