"use client"

import { getCurrentUser } from "../../../actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../FormWrap";
import LoginForm from "./LoginForm";

const LogIn = async() => {
    const currentUser = await getCurrentUser() 
    return ( 
        <Container>
            <FormWrap>
                <LoginForm currentUser={currentUser} />
            </FormWrap>
        </Container>
    );
}
 
export default LogIn;