import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="main-content">
      <div className="content">
        <div className="page-content">
          <h1 className="page-title">Acerca de nosotros</h1>
          
          <div className="page-section">
            <h2>Nuestra Misión</h2>
            <p>
              StreamHub es una plataforma de streaming en vivo que conecta a creadores de contenido 
              con audiencias de todo el mundo. Nuestro objetivo es proporcionar la mejor experiencia 
              de streaming tanto para streamers como para espectadores.
            </p>
          </div>

          <div className="page-section">
            <h2>¿Qué hacemos?</h2>
            <p>
              Ofrecemos una plataforma completa para transmitir contenido en vivo, incluyendo juegos, 
              charlas, música, arte y mucho más. Con herramientas avanzadas de streaming y una 
              comunidad vibrante, StreamHub es el lugar perfecto para compartir tu pasión.
            </p>
          </div>

          <div className="page-section">
            <h2>Nuestra Comunidad</h2>
            <p>
              Contamos con millones de usuarios activos que disfrutan de contenido diverso y de calidad. 
              Desde gamers profesionales hasta artistas independientes, nuestra plataforma acoge a 
              creadores de todas las edades y backgrounds.
            </p>
          </div>

          <div className="page-section">
            <h2>Tecnología</h2>
            <p>
              Utilizamos la tecnología más avanzada para garantizar streams de alta calidad con 
              baja latencia. Nuestra infraestructura global asegura que el contenido llegue a 
              los espectadores sin interrupciones, sin importar dónde se encuentren.
            </p>
          </div>

          <div className="page-section">
            <h2>Contacto</h2>
            <p>
              ¿Tienes preguntas o sugerencias? No dudes en contactarnos a través de nuestros 
              canales oficiales. Valoramos tu feedback y trabajamos constantemente para mejorar 
              la experiencia de nuestra comunidad.
            </p>
          </div>

          <div className="page-section">
            <h2>Nuestro Equipo</h2>
            <p>Conoce a los miembros del equipo que hacen posible StreamHub:</p>
            
            <div className="team-grid">
              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/almudena.jpg" alt="Almudena Rodriguez" />
                </div>
                <h3>Almudena Rodriguez</h3>
              </div>

              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/andrew.png" alt="Andrew Tamayo" />
                </div>
                <h3>Andrew Tamayo</h3>
              </div>

              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/dante.png" alt="Dante Chávez" />
                </div>
                <h3>Dante Chávez</h3>
              </div>

              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/sherlock.jpg" alt="Sherlock Castañeda" />
                </div>
                <h3>Sherlock Castañeda</h3>
              </div>

              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/gabriel.jpg" alt="Gabriel Gutiérrez" />
                </div>
                <h3>Gabriel Gutiérrez</h3>
              </div>

              <div className="team-member">
                <div className="team-photo">
                  <img src="../images/mateo.jpg" alt="Mateo Ortega" />
                </div>
                <h3>Mateo Ortega</h3>
              </div>
            </div>
          </div>

          <div className="back-button-container">
            <Link to="/" className="back-button">
              Regresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;