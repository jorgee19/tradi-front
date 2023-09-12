import React, {Component} from 'react';
import SideButton from '../components/SideButton';
import WarningButton from '../components/WarningButton';


import './SuperiorButton.css';

class SuperiorButtons extends Component{
  constructor(props){
    super(props);
    this.state = {
      url : "",
      url2: ""
    }
  }

  componentDidMount = () => {
    this.initNavBarScroll();
  }

  render(){
    return(
      <div className="nav-bar nav-bar-js">
        <SideButton onClick={this.props.handleMenu}/>
        <WarningButton  onClick={this.props.handleEmergencyMenu}/>
        <div style={{clear: 'both'}}></div>
      </div>
    );
  }

  initNavBarScroll() {
    this.navBar = document.querySelectorAll('#root .nav-bar-js')[0];
    this.lastScroll = window.scrollY;
    this.heightNavBar = this.navBar.offsetHeight;
    this.hiddenClass = 'nav-bar--sticky__hidden';

    /**
     * Al haber un desplazamiento hacia arriba, remueve la clase hiddenClass,
     * se elimina de la pila de eventos de scroll y agrega la funcion
     * hideNavBar a la pila de eventos de scroll.
     *
     * @params Ninguno
     * @returns void
     */
    this.showNavBar = () => {
      const {hiddenClass, navBar,showNavBar, hideNavBar, scrolledUp} = this;
      if( scrolledUp() ){
        navBar.classList.remove(hiddenClass);
        window.addEventListener('scroll', hideNavBar);
        window.removeEventListener('scroll', showNavBar);
      }
    }

    /**
     * Al haber un desplazamiento hacia abajo, agrega la clase hiddenClass,
     * se elimina de la pila de eventos de scroll y agrega la funcion
     * showNavBar a la pila de eventos de scroll.
     *
     * @params Ninguno
     * @returns void
     */
    this.hideNavBar = (e, t = false) => {
      const {
        scrolledDown, showNavBar, hideNavBar, navBar, hiddenClass
      } = this;
      if( scrolledDown() || t){
        navBar.classList.add(hiddenClass);
        window.addEventListener('scroll', showNavBar);
        window.removeEventListener('scroll', hideNavBar);
      }
    }

    /**
     * Activa el comportamiento de mostrar y ocultar la barra superior
     *
     * @param Ninguno
     * @return void
     */
    this.makeStickyNavBar = () => {
      const {
        heightNavBar, unmakeStickyNavBar,
        makeStickyNavBar, hideNavBar
      } = this;
      if(window.scrollY > heightNavBar){
        window.addEventListener('scroll', unmakeStickyNavBar);
        window.removeEventListener('scroll', makeStickyNavBar);
        window.addEventListener('scroll', hideNavBar );
      }
    }

    /**
     * Desactiva el comportamiento de mostrar y ocultar la barra superior.
     * @param Ninguno
     * @returns void
     */
    this.unmakeStickyNavBar = () => {
      const {
        makeStickyNavBar, unmakeStickyNavBar, hideNavBar
      } = this;
      if(window.scrollY < 1){
        window.addEventListener('scroll', makeStickyNavBar);
        window.removeEventListener('scroll', unmakeStickyNavBar);
        window.removeEventListener('scroll', hideNavBar);
      }
    }

    /**
     * Se encarga de revisar como fue el cambio del scroll
     * @param Ninguno
     * @returns integer
     */
    this.checkScroll = () => {
      let currentScroll = window.scrollY;
      let r = currentScroll - this.lastScroll;
      this.lastScroll = currentScroll;
      return r;
    }

    /**
     * Regresa verdadero al hacer al haberse desplazado hacia arriba.
     * @param Ninguno
     * @returns bool
     */
    this.scrolledUp = () => {
      let r = this.checkScroll() < 0.0;
      return r;
    }

    /**
     * Regresa verdadero al hacer al haberse desplazado hacia abajo.
     * @param Ninguno
     * @returns bool
     */
    this.scrolledDown = () => {
      let r = this.checkScroll() > 0.0;
      return r;
    }

    window.addEventListener('scroll', this.makeStickyNavBar);
  }
};
export default SuperiorButtons;
