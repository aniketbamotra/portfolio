import React from 'react'
import ReactDOM from 'react-dom/client'
import TopMenu from "../components/TopMenu";
import Layout from "../components/layout";
import CompliancePlatform from "../components/case-study/compliance-platform/CompliancePlatform";
import Contact from "../components/Contact";
import Copy from "../components/Copy";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <TopMenu base="/" />
      <main className="main-content">
        <CompliancePlatform />
        <Contact />
      </main>
      <Copy />
    </Layout>
  </React.StrictMode>,
)
