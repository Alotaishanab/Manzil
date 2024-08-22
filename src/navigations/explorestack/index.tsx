import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Explore, ExploreMaps} from '@screens';

type ExploreStackParamList = {
  // Account: undefined;
  Explore: undefined;
  ExploreMaps: undefined;
};
const MyExploreStack = createNativeStackNavigator<ExploreStackParamList>();

export const ExploreStack = () => {
  return (
    <MyExploreStack.Navigator screenOptions={{headerShown: false}}>
      <MyExploreStack.Screen name="Explore" component={Explore} />
      <MyExploreStack.Screen name="ExploreMaps" component={ExploreMaps} />
    </MyExploreStack.Navigator>
  );
};
