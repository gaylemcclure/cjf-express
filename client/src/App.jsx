// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import { HeaderProvider } from "./utils/headerContext";
import { LandingProvider } from "./utils/landingContext";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AppRouter from "./router/appRouter";
// import Header from "./components/header";
// import Footer from "./components/footer";
import "./App.css";
// // import "./input.css";
import "bootstrap/dist/css/bootstrap.min.css";

// const router = createBrowserRouter(AppRouter);

// const App = () => {
//   return (
//     <HeaderProvider>
//       <LandingProvider>
//         <Header />
//         {/* <Outlet /> */}
//         <RouterProvider router={router} />
//         <Footer />
//       </LandingProvider>
//     </HeaderProvider>
//   );
// };

// export default App;

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { OpenProvider } from "./utils/openContext";
import { Outlet } from "react-router-dom";
// import { UserProvider } from "../src/utils/contexts";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import Footer from "./components/footer";
import { useState, useMemo } from "react";
// import { ColorModeContext } from "./utils/themeContext";

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [path, setPath] = useState("welcome");
  const [mode, setMode] = useState("light");

  // const colorMode = useMemo(
  //   () => ({
  //     toggleColorMode: () => {
  //       setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  //     },
  //   }),
  //   [],
  // );

  // const theme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode,
  //         primary: {
  //           main: "#f3f4f9",
  //           contrastText: "#000",
  //           light: "#06866e",
  //         },
  //         secondary: {
  //           main: "#101010",
  //           contrastText: "#fff",
  //         },
  //         light: {
  //           main: "#f3f4f9",
  //         },
  //       },
  //       typography: {
  //         fontFamily: "Figtree, sans-serif",
  //         textDecoration: 'none'
  //       },
  //     }),
  //   [mode],
  // );

  return (
    <ApolloProvider client={client}>
      <HeaderProvider>
        <LandingProvider>
          <div className="flex-column justify-flex-start min-100-vh">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </LandingProvider>
      </HeaderProvider>
    </ApolloProvider>
  );
}

export default App;
