import TopMenu from "./components/TopMenu";
import Layout from "./components/layout";
import Bio from "./components/Bio";
import Projects from "./components/projects/Projects";
import Contact from "./components/Contact";
import Copy from "./components/Copy";

function App() {
  return (
    <Layout>
      <TopMenu />
      <main className="main-content">
        <Bio />
        <Projects />
        <Contact />
      </main>
      <Copy />
    </Layout>
  )
}

export default App
