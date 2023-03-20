import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import img_elImage3 from './images/HomeImages_elImage3_554550.jpg';
import img_elImage4 from './images/HomeImages_elImage4_391842.jpg';

export default class HomeImages extends Component {

  static contextType = ScreenContext;

  // This component doesn't use any properties

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
    const style_elImage3 = {
      backgroundImage: 'url('+img_elImage3+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
     };
    const style_elImage4 = {
      backgroundImage: 'url('+img_elImage4+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
     };
    
    return (
      <div className="HomeImages">
        <div className="layoutFlow">
          <div className="elImage3">
            <div style={style_elImage3} />
          </div>
        </div>
        
        <div className="foreground">
          <div className="elImage4" style={style_elImage4} />
        </div>
      </div>
    )
  }
  
}
