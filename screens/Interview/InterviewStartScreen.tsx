import React from 'react';
import {View, FlatList, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

const InterviewStartScreen = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  return (
    <View>
      <FlatList
        data={[
          {
            id: 1,
            name: 'John',
          },
          {
            id: 2,
            name: 'Doe',
          },
        ]}
        numColumns={2}
        renderItem={item => {
          return (
            <View style={{width: 100, height: 100, backgroundColor: 'red'}}>
              <Button
                onPress={() => {
                  navigation.navigate('MainScreen');
                }}
                title="Go to Main Screen"
              />
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default InterviewStartScreen;
