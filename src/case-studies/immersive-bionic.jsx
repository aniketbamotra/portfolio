import React from 'react'
import ReactDOM from 'react-dom/client'
import TopMenu from "../components/TopMenu";
import Layout from "../components/layout";
import ImmersiveBionic from "../components/case-study/immersive-bionic/ImmersiveBionic";
import Contact from "../components/Contact";
import Copy from "../components/Copy";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <TopMenu base="/" />
      <main className="main-content">
        <ImmersiveBionic />
        <Contact />
      </main>
      <Copy />
    </Layout>
  </React.StrictMode>,
)
