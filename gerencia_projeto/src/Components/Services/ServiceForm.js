import styles from '../Project/ProjectForm.module.css'
import {useState} from 'react'
import Input from '../Form/Input'
import SubmitButton from '../Form/SubmitButton'

function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value})
    }

    return (
        <form submit={submit} className={styles.form}>
            <Input
            type="text"
            text="Nome do serviço"
            name="Nome"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />

            <Input
            type="number"
            text="Custo do serviço"
            name="Cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />

            <Input
            type="text"
            text="Descrição do serviço"
            name="Description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
            />          

            <SubmitButton text={btnText} />  
        </form>
    )
}

export default ServiceForm