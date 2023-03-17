import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import img_elImage from './images/ImageGenOptionsScreen_elImage_284282.jpg';
import btn_icon_back_imagegenoptions from './images/btn_icon_back_imagegenoptions.png';

// UI framework component imports
import Button from 'muicss/lib/react/button';
import Appbar from 'muicss/lib/react/appbar';

export default class ImageGenOptionsScreen extends Component {

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

  onClick_elButton = async () => {
  
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
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    const style_elImage = {
      backgroundImage: 'url('+img_elImage+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
     };
    
    const style_elButton = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    
    const style_elButton2 = {
      display: 'block',
      color: '(null)',
      textAlign: 'center',
     };
    
    return (
      <div className="AppScreen ImageGenOptionsScreen" style={baseStyle}>
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
            <div className="systemFontItalic" style={style_elText}>
              <div>{this.context.locStrings.imagegenoptions_text_995529}</div>
            </div>
          </div>
          
          <div className="elImage">
            <div style={style_elImage} />
          </div>
          
          <div className="elButton">
            <Button className="actionFont" style={style_elButton}  color="primary" onClick={this.onClick_elButton} >
              {this.context.locStrings.imagegenoptions_button_352282}
            </Button>
          </div>
          
          <div className="elButton2">
            <Button className="actionFont" style={style_elButton2}  color="primary" >
              {this.context.locStrings.imagegenoptions_button2_21020}
            </Button>
          </div>
        </div>
        <div className="navBarContainer">
         <Appbar className="navBar">
          <div className="backBtn" onClick={ (ev)=>{ this.context.appActions.goBack() } }><img src={btn_icon_back_imagegenoptions} alt="" style={{width: '50%'}} /> </div>
         </Appbar>
        </div>
        
      </div>
    )
  }
  
}
