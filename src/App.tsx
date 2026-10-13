import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Nav } from './components/Nav.tsx'
import { Footer } from './components/Footer.tsx'
import { Home } from './pages/Home.tsx'
import { Work } from './pages/Work.tsx'
import { Cards } from './pages/Cards.tsx'
import { Support } from './pages/Support.tsx'
import { About } from './pages/About.tsx'
import { Contact } from './pages/Contact.tsx'
import { NotFound } from './pages/NotFound.tsx'
import MothersDayCardWrapper from './pages/MothersDayCardWrapper.tsx';
import FathersDayCardWrapper from './pages/FathersDayCardWrapper.tsx';
import FathersDayCardWrapperSpecial from './pages/FathersDayCardWrapperSpecial.tsx';
import HappyBirthdayCard from './pages/HappyBirthdayCard.tsx';
import FourthOfJulyCard from './pages/FourthOfJulyCard.tsx';
import HappyHalloweenCard from './pages/HappyHalloweenCard.tsx';
import HappyThanksgivingCard from './pages/HappyThanksgivingCard.tsx';

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Nav />
      <main>
        <Routes location={location} key={location.pathname}>
          <Route path="/"        element={<Home />}    />
          <Route path="/work"    element={<Work />}    />
          <Route path="/cards"   element={<Cards />}   />
          <Route path="/mothersdaycard" element={<MothersDayCardWrapper />} />
          <Route path="/fathersdaycard" element={<FathersDayCardWrapper />} />
          <Route path="/fathersdaycardspecial" element={<FathersDayCardWrapperSpecial />} />
          <Route path="/happybirthdaycard" element={<HappyBirthdayCard />} />
          <Route path="/fourthofjulycard" element={<FourthOfJulyCard />} />
          <Route path="/happyhalloweencard" element={<HappyHalloweenCard />} />
          <Route path="/happythanksgivingcard" element={<HappyThanksgivingCard />} />
          <Route path="/support" element={<Support />} />
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
