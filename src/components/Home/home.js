import React from "react";
import Landing from '../Landing/landing'
import Footer from "../Footer/footer";
import About from "../About/about";
import Creator from "../Creators/Creator";
import Process from '../../images/process.png'
import Partner from '../Partners/partners'
import '../../fonts/fonts.css'
import './home.css'

function Home() {
  return (
    <div id="home_container">
        <Landing/>
        <About/>
        <div id="processContainer">
        <h2>How Dakter Saab Web Works</h2>
        <img src={Process}></img>
        </div>
        <Partner/>
        <Creator/>
        <Footer/>
    </div>
  );
}

export default Home;