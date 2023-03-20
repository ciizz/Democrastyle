import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import HomeImages from './HomeImages';
import HomeImages2 from './HomeImages2';
import btn_icon_12675 from './images/btn_icon_12675.png';

// UI framework component imports
import Appbar from 'muicss/lib/react/appbar';

export default class WelcomeScreen extends Component {

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

  onClick_elIconButton = async () => {
    // Go to screen 'Explore'
    this.context.appActions.goToScreen('explore', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
  }
  
  
  onClick_elTextlogin = async () => {
    // Go to screen 'Login'
    this.context.appActions.goToScreen('login', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
  }
  
  
  onClick_elTextsignup = async () => {
    // Go to screen 'Signup'
    this.context.appActions.goToScreen('signup', this.context.baseScreenId, { transitionId: 'fadeIn' });
  
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
    const style_elText3 = {
      fontSize: 26.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    const style_elText = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    const style_elText4 = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
     };
    
    const style_elIconButton = {
      display: 'block',
      textTransform: 'uppercase',
      backgroundImage: 'url('+btn_icon_12675+')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '57.248%',
      backgroundPosition: '50% 0%',
      color: '(null)',
      textAlign: 'left',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    const style_elText2 = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
      textTransform: 'uppercase',
     };
    const style_elTextlogin = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'left',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    const style_elTextsignup = {
      fontSize: 16.0,
      color: 'rgba(0, 0, 0, 0.8500)',
      textAlign: 'center',
      cursor: 'pointer',
      pointerEvents: 'auto',
     };
    
    return (
      <div className="AppScreen WelcomeScreen" style={baseStyle}>
        <div className="background">
          <div className="containerMinHeight elBackground" style={style_elBackground_outer}>
            <div className="appBg" style={style_elBackground} />
          </div>
        </div>
        
        <div className="layoutFlow" style={layoutFlowStyle}>
          <div className="elText3">
            <div className="font-georgiaBoldItalic" style={style_elText3}>
              <div>{this.context.locStrings.welcome_text3_226663}</div>
            </div>
          </div>
          
          <div className="elText">
            <div className="font-georgiaItalic" style={style_elText}>
              <div>{this.context.locStrings.welcome_text_948304}</div>
            </div>
          </div>
          
          <div className="hasNestedComps elColumns">
            <div>
              <div className="col0">
                <HomeImages />
              </div>
              <div className="col1">
                <HomeImages2 />
              </div>
            </div>
          </div>
          
          <div className="elText4">
            <div className="font-georgiaItalic" style={style_elText4}>
              <div>{this.context.locStrings.welcome_text4_125126}</div>
            </div>
          </div>
          
          <div className="elIconButton">
            <button className="actionFont" style={style_elIconButton} onClick={this.onClick_elIconButton}  />
          </div>
        </div>
        <div className="navBarContainer">
         <Appbar className="navBar">
         </Appbar>
        </div>
        
        <div className="screenFgContainer">
          <div className="foreground">
            <div className="font-georgiaBoldItalic  elText2" style={style_elText2}>
              <div>{this.context.locStrings.welcome_text2_628090}</div>
            </div>
            <div className="font-georgia  elTextlogin" style={style_elTextlogin} onClick={this.onClick_elTextlogin} >
              <div>{this.context.locStrings.welcome_textcopy_743640}</div>
            </div>
            <div className="font-georgia  elTextsignup" style={style_elTextsignup} onClick={this.onClick_elTextsignup} >
              <div>{this.context.locStrings.welcome_text4_134010}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}
