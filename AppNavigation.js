import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from '@rneui/themed';
import {MainContext} from './src/contexts/mainContext';
import {tabManager} from './src/utility/tabManager';

const Tab = createMaterialBottomTabNavigator();

const AppNavigation = () => {
  const {tabType, checkStorage} = useContext(MainContext);
  let tabArray = [];
  tabArray = tabManager(tabType);

  useEffect(() => {
    checkStorage();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator shifting activeColor="#f0f0f0" backBehavior="firstRoute">
        {tabArray.map((tab, index) => {
          return (
            <Tab.Screen
              key={index}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarColor: tab.color,
                tabBarIcon: color => (
                  <Icon name={tab.iconName} type={'entypo'} color="#ffffff" />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
