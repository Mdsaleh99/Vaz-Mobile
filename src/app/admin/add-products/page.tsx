"use client"
import Container from "@/app/components/Container";
import AddProductForm from "./AddProductForm";
import FormWrap from "@/app/FormWrap";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async() => {
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role !== 'ADMIN'){
        return <NullData title="Ooops! Access Denied" />
    }

    return ( 
        <div className="p-8">
            <Container>
                <FormWrap>
                    <AddProductForm />
                </FormWrap>
            </Container>
        </div>
    );
}
 
export default AddProducts;