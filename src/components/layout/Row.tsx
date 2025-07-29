import {View, ViewStyle} from 'react-native';
import {type FlexAlignType} from 'react-native';

type RowProps = {
  children: React.ReactNode;
  style?: ViewStyle;
  gap?: number;
  align?: 'center' | 'start' | 'end';
  justify?: 'start' | 'center' | 'end' | 'between';
};

export const Row = ({
  children,
  style,
  gap = 0,
  align = 'center',
  justify = 'start',
}: RowProps) => {
  const alignMap: {
    [key: string]: FlexAlignType;
  } = {
    center: 'center',
    start: 'flex-start',
    end: 'flex-end',
  };
  const justifyMap: {
    [key: string]:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
  } = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
  };
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: alignMap[align],
          justifyContent: justifyMap[justify],
          gap,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
