import React from 'react'
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Platform, ART} from 'react-native';
const {Surface, Shape, Path, Group} = ART;

export default class CircularTimer extends React.Component {
  circlePath(cx, cy, r, startDegree, endDegree) {

    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, 0, (startDegree - endDegree) * Math.PI / 180, 1);

    return p;
  }
  circle(cx, cy, r) {
    let p = Path();
    p.path.push(0, cx + r, cy);
    p.path.push(4, cx, cy, r, 2 * Math.PI, 0.01, 0);
    return p;
  }
  extractFill(fill) {
    // reversing so that it spins the correct way
    if (fill < 0.01) {
      return 100;
    } else if (fill > 100) {
      return 0;
    }
    return 100 - fill;
  }

  formatTime(time) {
    var sec_num = parseInt(time / 1000); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours > 0
      ? hours + ':' + minutes + ':' + seconds
      : minutes + ':' + seconds;
  }
  render() {
    const {
      size,
      width,
      tintColor,
      backgroundColor,
      rotation,
      linecap,
      children
    } = this.props;
    const backgroundPath = this.circle(size / 2, size / 2, size / 2 - width / 2);
    const fill = this.extractFill(this.props.fill);
    const circlePath = this.circlePath(size / 2, size / 2, size / 2 - width / 2, 0, 360 * fill / 100);
    return (
        <Surface width={size} height={size}>
          <Group rotation={-90} originX={size / 2} originY={size / 2}>
            <Shape d={backgroundPath} stroke={backgroundColor} strokeWidth={width}/>
          {this.props.running != null ? <Shape d={circlePath} stroke={tintColor} strokeWidth={width} strokeCap={linecap}/> : null}
          </Group>
        </Surface>
    )
  }
}

CircularTimer.propTypes = {
  style: View.propTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  linecap: PropTypes.string,
  children: PropTypes.func
}

CircularTimer.defaultProps = {
  tintColor: '#ecdca9',
  backgroundColor: '#555',
  rotation: 0,
  linecap: 'butt'
}
