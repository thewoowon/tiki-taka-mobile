import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleScreen from './ArticleScreen';

const Stack = createNativeStackNavigator();

const ArticleStack = () => (
  <Stack.Navigator
    screenOptions={{
      detachPreviousScreen: true,
    }}
  >
    <Stack.Screen
      name="MainScreen"
      component={ArticleScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default ArticleStack;
