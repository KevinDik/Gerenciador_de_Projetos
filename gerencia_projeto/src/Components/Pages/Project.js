import styles from './Project.module.css'
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Loading from '../Layouts/Loading'
import Container from '../Layouts/Container'
import ProjectForm from '../Project/ProjectForm'
import Messages from '../Layouts/Messages'
import ServiceForm from '../Services/ServiceForm'

import {parse, v4 as uuidv4} from 'uuid'

function Project() {

    let {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('success')
    const [services, setServices] = useState([])
 

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
        },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((error) => console.log(error))
        }, 300)
    }, [id])

    function createService(project) {

        //ultimo serviço
        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //maximo valor validacao
        if(newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //adicionar cost ao projeto total
        project.cost = newCost

        //update
        fetch(`https://localhost:5000/projects/${project.id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            //exibir os serviços
            setServices(data.services)
            setShowServiceForm(!showServiceForm)
            setMessage('Serviço adicionado')
            setType('success')
        })
        .catch((error) => console.log(error))
    }

    function toogleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toogleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {
        setMessage('')

        //budget validation
        if (project.budget < project.cost) {
            setMessage('O orçamento não poderá ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(!showProjectForm)

            //mensagem
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch((error) => console.log(error))
    }

    return (
        <>
            {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Messages type={type} msg={message} />}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toogleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                        </button>
                        {!showProjectForm ? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Total de Orçamento:</span> {project.budget}</p>
                                <p><span>Total de Utilizado:</span> {project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm 
                                handleSubmit={editPost} 
                                btnText="Concluir edição" 
                                projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn}
                            onClick={toogleServiceForm}>{!showServiceForm ? 'Adicionar Serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm 
                                handleSubmit={createService}
                                btnText="Adicionar Serviço"
                                projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens serviços</p>
                    </Container>
                </Container>
            </div> 
            ) : ( 
            <Loading/>
        )}
        </>
    )
}

export default Project