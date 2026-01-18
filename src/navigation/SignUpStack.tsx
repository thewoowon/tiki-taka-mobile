import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignUpProvider} from '@contexts/SignUpContext';
import CompleteScreen from '../screens/auth/SignUpScreens/CompleteScreen';

export type SignUpStackParamList = {
  UserRole: undefined;
  Email: undefined;
  EmailVerification: undefined;
  Password: undefined;
  Info: undefined;
  Complete: undefined;
};

const Stack = createStackNavigator<SignUpStackParamList>();

const SignUpStack = () => {
  return (
    <SignUpProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Complete" component={CompleteScreen} />
      </Stack.Navigator>
    </SignUpProvider>
  );
};

export default SignUpStack;
