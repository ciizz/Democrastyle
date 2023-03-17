import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';

// UI framework component imports
import Appbar from 'muicss/lib/react/appbar';

export default class ExploreScreen extends Component {

  static contextType = ScreenContext;


  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate(prevProps, prevState) {
  }

  render() {
    let layoutFlowStyle = {};
    let baseStyle = {};
    if (this.context.transitionId && this.context.transitionId.length > 0 && this.context.atTopOfScreenStack && this.context.transitionForward) {
      baseStyle.animation = '0.25s ease-in-out '+this.context.transitionId;
    }
    if ( !this.context.atTopOfScreenStack) {
      layoutFlowStyle.height = '100vh';
      layoutFlowStyle.overflow = 'hidden';
    }
    
    const style_elBackground = {
      width: '100%',
      height: '100%',
     };
    const style_elBackground_outer = {
      boxSizing: 'border-box',
      backgroundColor: '#feffff',
     };
    const style_elText2 = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
      textTransform: 'uppercase',
     };
    
    return (
      <div className="AppScreen ExploreScreen" style={baseStyle}>
        <div className="background">
          <div className="containerMinHeight elBackground" style={style_elBackground_outer}>
            <div className="appBg" style={style_elBackground} />
          </div>
        </div>
        
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className="elSpacer">
            <div />
          </div>
        </div>
        <div className="navBarContainer">
         <Appbar className="navBar">
         </Appbar>
        </div>
        
        <div className="screenFgContainer">
          <div className="foreground">
            <div className="font-georgiaBoldItalic  elText2" style={style_elText2}>
              <div>{this.context.locStrings.explore_text2_802011}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
