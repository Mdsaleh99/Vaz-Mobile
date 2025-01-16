"use client";
import Container from "../components/Container";
import FormWrap from "../FormWrap";
import CheckOutClient from "./CheckOutClient";

const CheckOut = () => {
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <CheckOutClient />
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckOut;
