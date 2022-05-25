import React from "react";
import Modules from '../components/Modules';
import Footer from '../components/Footer';
import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from '../config'
import Aos from 'aos';
import 'aos/dist/aos.css';



function HomeContent() {
  const [modul, setModul] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/modul`)
      .then(({ data }) => {
        setModul(data.data);
        console.log(data.data)
      })
      .catch((error) => {
        console.log(error);
      });
    Aos.init({ duration: 2000 });}, []);

  return (
    <>
      <main className="px-md-4 wrapper2">
        <div style={{ marginTop: '-5rem' }} className="module-resizing-cards d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2" style={{ color: '#0d3360' }}><b>MODULES</b></h1>
        </div>

        <div className="module-resizing" style={{ marginBottom: "1.2rem" }}></div>

        <div className="wrapper">
          {modul.map((module) => <Modules key={module._id} id={module._id} image={module.image} module_name={module.name} title={module.title} module_page={module.score} score={module.score} timePassed={module.timePassed} />)}
        </div>

        <Footer />
      </main>

    </>
  )
}

export default HomeContent;