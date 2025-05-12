import React from 'react'
import PHeroSection from './PHeroSection'
import OurServices from "./OurServices"
import Speciality from './Speciality'
import Footer from '../HomePages/Footer'

export default function PatientHome() {
  return (
    <div>
      <section id="hero">
        <PHeroSection/>
      </section>
      <section id="services">
        <OurServices/>
      </section>
      <section id="speciality">
        <Speciality/>
      </section>
      <Footer/>
    </div>
  )
}
