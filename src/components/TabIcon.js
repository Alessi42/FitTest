import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, Image
} from 'react-native';

//console.log(Icon);
const icons = {
  Workouts: require("../components/Icons/Workouts_s.png"),
  Challenges: require("../components/Icons/Challenges_s.png"),
  Profile: require("../components/Icons/Profile_s.png"),
}
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

const TabIcon = (props) => (
  <View style={styles.tab}>
    {props.iconName? <Image style={[styles.icon, {tintColor: props.selected ? '#ecdca9':'#a1a0a1'}]} resizeMode={Image.resizeMode.resize} source={icons[props.iconName]}/> : null}
    <Text style={{ fontSize: 12, color: props.selected ? '#ecdca9' : '#a1a0a1' }}>
      {props.title}
    </Text>
  </View>
);

const styles = {
  tab: {
    alignItems:'center',
    //backgroundColor: '#302d2e',
  },
  icon: {
    height:20,
    width:20,
  }
}
TabIcon.propTypes = propTypes;

export default TabIcon;
