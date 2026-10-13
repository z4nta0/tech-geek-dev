import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Nav } from './components/Nav.tsx'
import { Footer } from './components/Footer.tsx'
import { Home } from './pages/Home.tsx'
import { Work } from './pages/Work.tsx'
import { About } from './pages/About.tsx'
import { Contact } from './pages/Contact.tsx'
import { NotFound } from './pages/NotFound.tsx'

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Nav />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Home />}    />
          <Route path="/work"    element={<Work />}    />
          <Route path="/about"   element={<About />}   />
          <Route path="/contact" element={<Contact />} />
          <Route path="*"        element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
