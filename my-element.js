import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
  constructor() {
    super();
    this.usuario = '';
    this.contraseña = '';
    this.correo = '';
    this.registrados = {};
    this.mostrarFormularioRegistro = false;
    this.mostrarFormularioInicioSesion = false;
    this.registroExitoso = false;
    this.inicioSesionExitoso = false;
    this.inicioSesionFallido = false;
  }

  static get properties() {
    return {
      usuario: { type: String },
      contraseña: { type: String },
      correo: { type: String },
      registro: { type: Boolean },
      inicio: { type: Boolean },
      registroExitoso: { type: Boolean },
      inicioSesionExitoso: { type: Boolean },
      inicioSesionFallido: { type: Boolean }
    };
  }

  toggleFormularioRegistro() {
    this.registro = !this.registro;
    this.inicio = false;
    this.registroExitoso = false;
  }

  toggleFormularioInicioSesion() {
    this.inicio = !this.inicio;
    this.registro = false;
    this.inicioSesionExitoso = false;
    this.inicioSesionFallido = false;
  }

  registroopen(event) {
    event.preventDefault();
    const nombreUsuario = this.shadowRoot.querySelector('#nombre-registro').value;
    const password = this.shadowRoot.querySelector('#contraseña-registro').value;
    const correo = this.shadowRoot.querySelector('#correo-registro').value;

    this.registrados[nombreUsuario] = password;
    this.usuario = nombreUsuario;
    this.registroExitoso = true;
  }

  inicioopen(event) {
    event.preventDefault();
    const nombreUsuario = this.shadowRoot.querySelector('#nombre-inicio-sesion').value;
    const password = this.shadowRoot.querySelector('#contraseña-inicio-sesion').value;

    if (this.registrados[nombreUsuario] === password) {
      this.usuario = nombreUsuario;
      this.inicioSesionExitoso = true;
      this.inicioSesionFallido = false;
    } else {
      this.inicioSesionFallido = true;
      this.usuario = '';
    }
  }

  render() {
    return html`
      <h1>Hola ${this.usuario}</h1>
      
      <button @click=${this.toggleFormularioRegistro}>Mostrar Formulario de Registro</button>
      ${this.registro ? html`
        <form>
          <input type="text" id="nombre-registro" placeholder="Nombre de usuario">
          <input type="password" id="contraseña-registro" placeholder="Contraseña">
          <input type="email" id="correo-registro" placeholder="Correo electrónico">
          <button @click=${this.registroopen}>Registrarse</button>
        </form>
        ${this.registroExitoso ? html`<p>Registro exitoso</p>` : ''}
      ` : ''}

      <button @click=${this.toggleFormularioInicioSesion}>Mostrar Formulario de Inicio de Sesión</button>
      ${this.inicio ? html`
        <form>
          <input type="text" id="nombre-inicio-sesion" placeholder="Nombre de usuario">
          <input type="password" id="contraseña-inicio-sesion" placeholder="Contraseña">
          <button @click=${this.inicioopen}>Iniciar Sesión</button>
          ${this.inicioSesionFallido ? html`<p>Usuario o contraseña incorrectos</p>` : ''}
        </form>
        ${this.inicioSesionExitoso ? html`<p>Inicio de sesión exitoso</p>` : ''}
      ` : ''}
    `;
  }
}

customElements.define('my-element', MyElement);


