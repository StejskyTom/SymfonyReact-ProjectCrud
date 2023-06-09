import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';

function ProjectShow() {
    const [id, setId] = useState(useParams().id)
    const [project, setProject] = useState({name:'', description:''})
    useEffect(() => {
        axios.get(`/api/project/${id}`)
            .then(function (response) {
                setProject(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Zobrazit projekt</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/projects"> Zobrazit všechny projekty
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Název:</b>
                        <p>{project.name}</p>
                        <b className="text-muted">Popis:</b>
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProjectShow;