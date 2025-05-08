import {useState} from 'react'

import Input from '../../form/Input'
import {Link} from 'react-router-dom'
import styles from '../../form/Form.module.css'



function Register() {


    function handleChange(e){

    }

    return (
        <section className={styles.form_container}>
            <h1>Registar</h1>
            <form>
                <Input 
                text="Nome"
                type="text"
                name="name"
                placeHolder="Digite o seu nome"
                handleOnChange={handleChange}
                />
                <Input 
                text="E-mail"
                type="email"
                name="email"
                placeHolder="Digite o seu E-mail"
                handleOnChange={handleChange}
                />
                <Input 
                text="Senha"
                type="password"
                name="password"
                placeHolder="Digite a sua senha"
                handleOnChange={handleChange}
                />
                <Input 
                text="Confirmação de Senha"
                type="password"
                name="confirmpassword"
                placeHolder="Confirme a senha"
                handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem conta? <Link to="/login">Clique Aqui</Link>
            </p>
        </section>
    )
}

export default Register