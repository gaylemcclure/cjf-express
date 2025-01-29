import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const StripeContext = createContext();

export const useStripeContext = () => useContext(StripeContext);

export const StripeProvider = ({ children }) => {
  const [stripe, setStripe] = useState([]);

  useEffect(() => {
    const getKey = async () => {
      const response = await fetch("/api/stripe");
      const { client_secret: clientSecret, payment_intent: paymentIntent } = await response.json();

      const options = {
        // passing the client secret obtained in step 3
        clientSecret: clientSecret,

        // Fully customizable with appearance API.
        appearance: {
          /*...*/
        },
      };

      // return options;
      setStripe(options);
    };

    // const stripeOptions = getKey();
    getKey();
  }, []);

  return <StripeContext.Provider value={{ stripe: stripe }}>{children}</StripeContext.Provider>;
};
