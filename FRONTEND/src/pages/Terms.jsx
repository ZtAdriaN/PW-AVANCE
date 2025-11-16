import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="main-content">
      <div className="content">
        <div className="page-content">
          <div className="university-logo">
            <img src="/images/ulima.png" alt="Logo Universidad" />
          </div>
          <h1 className="page-title">Términos y Condiciones</h1>
          
          <div className="page-section">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar StreamHub, aceptas estar sujeto a estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, no debes usar nuestro servicio.
            </p>
          </div>

          <div className="page-section">
            <h2>2. Uso del Servicio</h2>
            <p>
              StreamHub te proporciona acceso a una plataforma de streaming en vivo. Puedes usar 
              nuestro servicio para ver contenido, crear transmisiones y participar en la comunidad, 
              siempre que cumplas con nuestras normas y directrices.
            </p>
          </div>

          <div className="page-section">
            <h2>3. Contenido del Usuario</h2>
            <p>
              Eres responsable de todo el contenido que subas, transmitas o compartas en StreamHub. 
              No debes publicar contenido que sea ilegal, ofensivo, discriminatorio o que viole 
              los derechos de terceros.
            </p>
          </div>

          <div className="page-section">
            <h2>4. Normas de la Comunidad</h2>
            <p>
              Mantenemos un ambiente seguro y acogedor para todos. Están prohibidos el acoso, 
              el spam, el contenido sexual explícito no consensuado, la incitación al odio y 
              cualquier comportamiento que pueda dañar a otros usuarios.
            </p>
          </div>

          <div className="page-section">
            <h2>5. Propiedad Intelectual</h2>
            <p>
              Respeta los derechos de autor y la propiedad intelectual. No transmitas contenido 
              que no tengas derecho a usar, incluyendo música, videos, imágenes u otro material 
              protegido por derechos de autor.
            </p>
          </div>

          <div className="page-section">
            <h2>6. Privacidad</h2>
            <p>
              Tu privacidad es importante para nosotros. Consulta nuestra Política de Privacidad 
              para entender cómo recopilamos, usamos y protegemos tu información personal.
            </p>
          </div>

          <div className="page-section">
            <h2>7. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. 
              Te notificaremos sobre cambios significativos y tu uso continuado del servicio 
              constituirá tu aceptación de los nuevos términos.
            </p>
          </div>

          <div className="page-section">
            <h2>8. Terminación</h2>
            <p>
              Podemos suspender o terminar tu acceso a StreamHub si violas estos términos o 
              nuestras políticas. También puedes cerrar tu cuenta en cualquier momento.
            </p>
          </div>

          <div className="page-section">
            <h2>9. Contacto</h2>
            <p>
              Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos 
              a través de nuestros canales oficiales de soporte.
            </p>
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

export default Terms;