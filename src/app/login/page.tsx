import Container from "../components/Container";
import FormWrap from "../FormWrap";
import LoginForm from "./LoginForm";

const LogIn = () => {
    return ( 
        <Container>
            <FormWrap>
                <LoginForm />
            </FormWrap>
        </Container>
    );
}
 
export default LogIn;