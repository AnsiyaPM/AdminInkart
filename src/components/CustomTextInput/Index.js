import {View, Text, TextInput} from 'react-native';
import React from 'react';
import colors from '../../common/colors';

const CustomTextInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    icon,
    border,
    width,
    secureTextEntry,
    multiline,
  } = props;

  return (
    <View
      style={{
        flexDirection: icon ? 'row' : 'column',
        justifyContent: 'space-between',
        alignItems: icon ? 'center' : 'baseline',
        alignItems: 'center',
        borderWidth: border ? 1 : 0,
        borderColor: colors.primaryGreen,
        width: width,
        padding:5,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 8,
        alignSelf: 'center',
        backgroundColor:colors.white_level_3
      }}>
      <TextInput
        secureTextEntry={secureTextEntry}
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.black_level_3}
        placeholder={placeholder}
        multiline={multiline}
        value={value}
        onChangeText={text=>onChangeText(text)}
        style={{
          color: colors.black_level_2,
          fontFamily: 'Lato-Regular',
          fontSize: 16,
          height:multiline ?100 :'default',
          width:icon?'90%' :'90%'
        }}
      />
      {icon ? icon : null}
    </View>
  );
};

export default CustomTextInput;
