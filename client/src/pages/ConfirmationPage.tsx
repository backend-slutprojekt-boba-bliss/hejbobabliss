import {
  Button,
  Link as ChakraLink,
  Container,
  Flex,
  SystemStyleObject
} from "@chakra-ui/react";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderConfirmationCard } from "../components/OrderConfirmationCard";

export function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null); // State to store the order details

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/api/orders/id/${id}`);
        setOrder(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchOrder();
  }, [id]);


  return (
    <Container sx={checkoutContainer} maxW="container.md">
      <OrderConfirmationCard />
      <Flex sx={informationContainer}>
      <div>
          {order ? (
            <div>
              <p>Name: {order?.deliveryAddress.firstName} {order?.deliveryAddress.lastName}</p>
              <p>Street: {order?.deliveryAddress.street}</p>
              <p>Zip Code: {order?.deliveryAddress.zipCode}</p>
              <p>City: {order?.deliveryAddress.city}</p>
              {/* Display other relevant order information */}
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
          </div>
      </Flex>
      <Flex>
        <ChakraLink
          sx={buttonWrapper}
          href="/"
          _hover={{ textDecoration: "none" }}
        >
          <Button
            loadingText="Submitting"
            sx={submitButtonStyle}
            type="submit"
            variant="outline"
            colorScheme="teal"
          >
            Place another order
          </Button>
        </ChakraLink>
      </Flex>
    </Container>
  );
}

const checkoutContainer: SystemStyleObject = {
  my: "2rem",
  borderRadius: "0.625rem",
  py: "1rem",
  bg: "lightYellow",
};

const submitButtonStyle: SystemStyleObject = {
  marginTop: "2rem",
  marginBottom: "1rem",
  width: "14rem",
  height: "4rem",
  mx: "auto",
  bg: "lightGreenButton",
  color: "black",
  border: "none",
};

const informationContainer: SystemStyleObject = {
  marginTop: "2rem",
  padding: "2rem",
  borderRadius: "5px",
  background: "#fee5bd",
  color: "lightBrownText",
};

const buttonWrapper: SystemStyleObject = {
  mx: "auto",
};
