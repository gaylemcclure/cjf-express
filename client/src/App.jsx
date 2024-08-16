import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import { HeaderProvider } from './utils/headerContext';
import { LandingProvider } from './utils/landingContext';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header';
import Footer from './components/footer';
import './App.css'
import './input.css'

function App() {
  const [count, setCount] = useState(0)


  return (
    <HeaderProvider>
    <LandingProvider>
    <Header />
    <Outlet />
    <Footer />
    </LandingProvider>
    </HeaderProvider>
  )
}

export default App
