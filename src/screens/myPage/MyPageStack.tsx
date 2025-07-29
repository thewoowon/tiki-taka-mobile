import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from './MyPageScreen';

const Stack = createNativeStackNavigator();

const MyPageStack = () => (
  <Stack.Navigator
    screenOptions={{
      detachPreviousScreen: true,
    }}
  >
    <Stack.Screen
      name="MyPageScreen"
      component={MyPageScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default MyPageStack;
