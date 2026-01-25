import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from './HistoryScreen';

const Stack = createNativeStackNavigator();

const HistoryStack = () => (
  <Stack.Navigator
    screenOptions={{
      detachPreviousScreen: true,
    }}
  >
    <Stack.Screen
      name="HistoryScreen"
      component={HistoryScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default HistoryStack;
