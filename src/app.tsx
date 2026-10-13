import React from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { NavBarCom } from './ui/nav.tsx'
import { SitFooCom } from './ui/footer.tsx'
import { Home } from './pages/home/home.tsx'
import { WorPagCom } from './pages/work/work.tsx'
import { About } from './pages/about/about.tsx'
import { Contact } from './pages/contact/contact.tsx'
import { NotFouCom } from './pages/not-found/not-found.tsx'

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <NavBarCom />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Home />}    />
          <Route path="/work"    element={<WorPagCom />}    />
          <Route path="/about"   element={<About />}   />
          <Route path="/contact" element={<Contact />} />
          <Route path="*"        element={<NotFouCom />} />
        </Routes>
      </main>
      <SitFooCom />
    </>
  )
}

export default App
