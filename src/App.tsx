import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Home } from './pages/Home'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        pular para o conteúdo
      </a>
      <div id="top">
        <Header />
      </div>
      <main id="main">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
