import Messages from '../Layouts/Messages'
import {useLocation} from 'react-router-dom'
import Container from '../Layouts/Container'
import LinkButton from '../Layouts/LinkButton'

import styles from './Projects.module.css'


function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Messages type="success" msg={message}/>}
            <Container customClass="start">
                <p>Meus projeto</p>
            </Container>
        </div>
    )
}

export default Projects