import Messages from '../Layouts/Messages'
import {useLocation} from 'react-router-dom'
import Container from '../Layouts/Container'
import LinkButton from '../Layouts/LinkButton'
import ProjectCard from '../Project/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../Layouts/Loading'

import styles from './Projects.module.css'


function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then(data => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch((err) => console.log(err))
        }, 300)
    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Messages type="success" msg={message}/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard 
                        name={project.name}
                        id={project.id}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.key}
                        />
                ))}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&
                    <p>Não há projetos cadastrados</p>
                }
            </Container>
        </div>
    )
}

export default Projects