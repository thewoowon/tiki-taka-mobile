import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InterviewScreen from './InterviewScreen';

const Stack = createNativeStackNavigator();

const InterviewStack = () => (
  <Stack.Navigator
    screenOptions={{
      detachPreviousScreen: true,
    }}
  >
    <Stack.Screen
      name="MainScreen"
      component={InterviewScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default InterviewStack;
