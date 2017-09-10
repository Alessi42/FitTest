import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
  Schema
} from 'react-native-router-flux';
import TabIcon from '../components/TabIcon';
import Routes from '../routes/index'
import ChevronLeft from '../components/Icons/ChevronLeft.png'
import Workouts from '../routes/Workouts'

const createWorkouts = () => {
  return Routes.childRoutes.map((route) => {
    return <Scene key={route.path} onBack={() => Actions.pop()} component={route.component} title={route.title} hideNavBar={true} hideTabBar navigationBarStyle={styles.navBarStyle} leftButtonIcon={ChevronLeft} leftButtonIconStyle={{
      tintColor: '#eddca9'
    }} titleStyle={styles.navTitleStyle} sceneStyle={styles.sceneStyle}/>
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#302d2e',
  },
  navBarStyle: {
    backgroundColor: '#231f21'
  },
  navTitleStyle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '500'
  },
  sceneStyle: {
    backgroundColor: '#231f21'
  }
});
// direction="leftToRight" stops white transition flash
const scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="tabbar"
      tabs
      tabBarStyle={styles.tabBarStyle}>
      <Scene
        key="main"
        title={Routes.indexRoute.title}
        icon={TabIcon}
        iconName={Routes.indexRoute.iconName}
        initial={true}>
        <Scene
          key={Routes.indexRoute.path}
          component={Routes.indexRoute.component}
          title={Routes.indexRoute.title}
          sceneStyle={styles.sceneStyle}
          direction="leftToRight"
          hideNavBar
          initial={true}>
        </Scene>
        { createWorkouts() }
      </Scene>
      <Scene
        key="challenges"
        title={Routes.challengesRoute.title}
        icon={TabIcon}
        iconName={Routes.challengesRoute.iconName}>
        <Scene
          key={Routes.challengesRoute.title}
          title={Routes.challengesRoute.title}
          component={Routes.challengesRoute.component}
          sceneStyle={styles.sceneStyle}
          direction="leftToRight"
          hideNavBar
          initial={true}>
        </Scene>
        <Scene
          key={Routes.challengeScreenRoute.path}
          component={Routes.challengeScreenRoute.component}
          title={Routes.challengeScreenRoute.title}
          hideNavBar={false}
          hideTabBar
          navigationBarStyle={styles.navBarStyle}
          leftButtonIcon={ChevronLeft}
          leftButtonIconStyle={{tintColor: '#eddca9'}}
          titleStyle={styles.navTitleStyle}
          sceneStyle={styles.sceneStyle}
          >
        </Scene>
      </Scene>
      <Scene
        key={Routes.userRoute.path}
        component={Routes.userRoute.component}
        title={Routes.userRoute.title}
        hideNavBar
        icon={TabIcon}
        iconName={Routes.userRoute.iconName}
        sceneStyle={styles.sceneStyle}>
      </Scene>
    </Scene>
  </Scene>
)

export default scenes
