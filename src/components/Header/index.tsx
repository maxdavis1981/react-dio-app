import React, { useContext } from 'react'
import logo from '../../assets/logo-dio.png';
import { BuscarInputContainer, 
    Container, 
    Input, 
    Menu, 
    MenuRight, 
    Row, Wrapper, UserPicture } from "./styles";
import { Button } from "../Button";
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {

    const { user, handleSignOut } = useAuth(); //TODO usando um hook customizado

    return (
       <Wrapper>
         <Container>
            <Row>
                <Link to="/">
                  <img src={logo} alt="Logo da dio"/>
                </Link>
                {user.id ? (
                    <>
                    <BuscarInputContainer>
                    <Input placeholder='Buscar...'/>
                    </BuscarInputContainer>
                    <Menu>Live Code</Menu>
                    <Menu>Global</Menu>
                </>
                ) : null}
                
            </Row>
            <Row>
            {user.id ? (
                    <>
                    <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4"/>
                    <a href="#" onClick={handleSignOut}>Sair</a>
                    </> 
                ) : (
                    <>
                    <MenuRight href="#">Home</MenuRight>
                    <Button title="Entrar"/>
                    <Button title="Cadastrar"/>
                    </>
                )}
           
            </Row>
         </Container>
       </Wrapper> 
    )
}

export {Header};