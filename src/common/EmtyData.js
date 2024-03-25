import {View, Text} from 'react-native';
import React from 'react';
import colors from './colors';

const EmtyData = () => {
  return (
    <View
      style={{
        marginVertical: 8,
        borderRadius: 15,
        width: '95%',
        backgroundColor: colors.lght_grey,
        alignSelf: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          fontFamily: 'Lato-Bold',
          fontSize: 20,
          color: colors.black_level_3,
          lineHeight: 35,
        }}>
        No results found
      </Text>
    </View>
  );
};

export default EmtyData;
