import { Footer } from './components/Footer'
import { Home } from './pages/Home'

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        pular para o conteúdo
      </a>
      <main id="main">
        <Home />
      </main>
      <Footer />
    </>
  )
}

export default App
