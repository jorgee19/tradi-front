import React, {Component} from 'react';
import InternalMap from './InternalMap.jsx';
import ExternalMap from './ExternalMap.jsx';
import BottomBar from './BottomBar.jsx';

import {EXTERNAL_MAP_INFO, INTERNAL_MAP_INFO} from './DUMMY_INFO.js';

class Map extends Component{
  state = {
    screens : {
      externalMap : 1,
      internalMap : 0,
    },
    currentScreen : 1,

  }

  render(){
    const { changeToInternalMap, changeToExternallMap } = this;
    const actions = {
      handleClickExternal: changeToInternalMap,
      handleClickInternal: changeToExternallMap
    };
    return(
      <React.Fragment>
        <div className="map-section">
          { this.selectScreen() }
        </div>
        <BottomBar buttonsActions={actions}/>
      </React.Fragment>
    )
  }

  selectScreen = () => {
    const {currentScreen} = this.state;
    const {externalMap, internalMap} = this.state.screens;
    let renderedMap;
    switch(currentScreen){
      case externalMap:
        renderedMap = <ExternalMap locations={EXTERNAL_MAP_INFO.data} userData={this.props.userData}/>
        break;
      case internalMap:
        renderedMap = <InternalMap  mapImage={INTERNAL_MAP_INFO.mapImage} schoolId = {this.props.schoolId} userData={this.props.userData} />
        break;
      default:
        renderedMap = <div className="error">No se pudo escoger una ventana correcta</div>
        break;
    }
    return renderedMap;
  }

  changeToInternalMap = () => {
    const {internalMap} = this.state.screens;
    this.setState({currentScreen: internalMap});
  }

  changeToExternallMap = () => {
    const {externalMap} = this.state.screens;
    this.setState({currentScreen: externalMap});
  }

}

export default Map;
