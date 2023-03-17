import React, { Component } from 'react';
import './App.css';
import ScreenContext from './ScreenContext';
import img_elImage5 from './images/HomeImages2_elImage5_45524.jpg';
import img_elImage6 from './images/HomeImages2_elImage6_595088.jpg';

export default class HomeImages2 extends Component {

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
    const style_elImage5 = {
      backgroundImage: 'url('+img_elImage5+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
     };
    const style_elImage6 = {
      backgroundImage: 'url('+img_elImage6+')',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50% 50%',
      backgroundSize: 'cover',
     };
    
    return (
      <div className="HomeImages2">
        <div className="foreground">
          <div className="elImage5" style={style_elImage5} />
          <div className="elImage6" style={style_elImage6} />
        </div>
      </div>
    )
  }
  
}
