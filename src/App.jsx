import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TopMenu from "./components/TopMenu";
import Layout from "./components/layout";
import Bio from "./components/Bio";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Copy from "./components/Copy";

function App() {

  return (
    <>
     <Layout>
        <TopMenu />
        <Bio />
        <Projects />
        <Contact />
        <Copy />
      </Layout>
    </>
  )
}

export default App
