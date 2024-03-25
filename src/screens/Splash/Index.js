import { View, Text, Image } from 'react-native'
import React from 'react'

const Splash = () => {
  return (
    <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
     <Image
          source={require('../../assets/images/splash.jpg')}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            alignSelf: 'center',
          }}
        />

    </View>
  );
};

export default Splash;