import styles from './Home.module.css'

import savings from '../../img/savings.svg'
import LinkButton from '../Layouts/LinkButton'

function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>gerenciador de projetos</span></h1>
            <p>Comece a gerenciar os seus projetos</p>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            <img src={savings} alt="Gerenciador"/>
        </section>
    )
} 
export default Home 