import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'
import {useHistory} from 'react-router-dom'

function NewProject() {

    const history = useHistory()

    function createPost(project) {
        //inicializa o project e os serviços

        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            history.push('/projects', {message: 'Projeto criado com sucesso!'})
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar novo projeto</h1>
            <p>Adicione seu projeto primeiramente para depois inserir seus serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
} 
export default NewProject