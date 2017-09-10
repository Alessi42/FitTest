import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';

import CircularTimer from './circularTimer'
const AnimatedProgress = Animated.createAnimatedComponent(CircularTimer);

export default class AnimatedCircularTimer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      chartFillAnimation: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.animateFill();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeElapsed !== this.props.timeElapsed) {
      this.animateFill();
      // this.performLinearAnimation()
    }
  }

  animateFill() {
    const { tension, friction } = this.props;
    Animated.spring(
      this.state.chartFillAnimation,
      {
        toValue: this.props.fill,
        tension,
        friction
      }
    ).start();
  }


  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.chartFillAnimation}
        />
    )
  }
}

AnimatedCircularTimer.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number,
  prefill: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  backgroundColor: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  tension: PropTypes.number,
  friction: PropTypes.number
}

AnimatedCircularTimer.defaultProps = {
  tension: 10,
  friction: 7,
};
