import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'

function NewProject() {
    return (
        <div className={styles.newproject_container}>
            <h1>Criar novo projeto</h1>
            <p>Adicione seu projeto primeiramente para depois inserir seus serviços</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    )
} 
export default NewProject