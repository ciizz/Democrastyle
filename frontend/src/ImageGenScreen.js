import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import btn_icon_back_imagegen from './images/btn_icon_back_imagegen.png';

// UI framework component imports
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';

export default class ImageGenScreen extends Component {

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

  onClick_elButton3 = async () => {
    // Go to screen 'ImageGen Options'
    this.context.appActions.goToScreen('imageGenOptions', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
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
    const style_elText = {
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    
    const style_elButton = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
     };
    const style_elText2 = {
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    
    const style_elButton2 = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
     };
    
    const style_elButton3 = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    
    return (
      <div className="AppScreen ImageGenScreen" style={baseStyle}>
        <div className="background">
          <div className="containerMinHeight elBackground" style={style_elBackground_outer}>
            <div className="appBg" style={style_elBackground} />
          </div>
        </div>
        
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className="elSpacer">
            <div />
          </div>
          
          <div className="elText">
            <div className="baseFont" style={style_elText}>
              <div>{this.context.locStrings.imagegen_text_514323}</div>
            </div>
          </div>
          
          <div className="elButton">
            <Button className="actionFont" style={style_elButton}  color="primary" >
              {this.context.locStrings.imagegen_button_316913}
            </Button>
          </div>
          
          <div className="elText2">
            <div className="baseFont" style={style_elText2}>
              <div>{this.context.locStrings.imagegen_text2_773327}</div>
            </div>
          </div>
          
          <div className="elButton2">
            <Button className="actionFont" style={style_elButton2}  color="primary" >
              {this.context.locStrings.imagegen_button2_629290}
            </Button>
          </div>
          
          <div className="elButton3">
            <Button className="actionFont" style={style_elButton3}  color="primary" onClick={this.onClick_elButton3} >
              {this.context.locStrings.imagegen_button3_575079}
            </Button>
          </div>
        </div>
        <div className="navBarContainer">
         <Appbar className="navBar">
          <div className="backBtn" onClick={ (ev)=>{ this.context.appActions.goBack() } }><img src={btn_icon_back_imagegen} alt="" style={{width: '50%'}} /> </div>
         </Appbar>
        </div>
        
      </div>
    )
  }
  
}
