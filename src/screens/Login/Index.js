import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../../components/CustomTextInput/Index';
import CustomButton from '../../components/CustomButton/Index';
import Snackbar from 'react-native-snackbar';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';

const Login = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch=useDispatch();

  const handleLogin = async () => {
    if (email.trim() === 'admin@yopmail.com' && password.trim() === '123') {
      await firestore()
        .collection('Users')
        .where('email', '==', email.trim().toLocaleLowerCase())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              const resData = documentSnapshot.data();
              //  console.warn(resData);
              if (password.trim() === resData.password) {

                dispatch(login({userId: documentSnapshot.id}));
                
                Snackbar.show({
                  text: 'Login Succesfull',
                  duration: ckbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white_level_1,
                });
              } else {
                Snackbar.show({
                  text: 'The password you enterd is wrong ',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.red,
                  textColor: colors.white_level_1,
                });
              }
            });
          }
        })
        .catch(err => console.warn('err'));
    } else {
      Snackbar.show({
        text: 'The entered credentials are wrong.please chech again',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white_level_1,
      });
    }
  };

  const handleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../../assets/images/topBg.png')}
        style={{width: '100%', height: 150}}
      />
      <ScrollView
        style={{
          marginTop: -25,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: colors.white,
        }}>
        <Image
          source={require('../../assets/images/logo.jpeg')}
          style={{
            width: 250,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Lato-Bold',
            fontSize: 22,
            marginBottom: 20,
            color: colors.black_level_2,
          }}>
          Admin Login
        </Text>
        <CustomTextInput
          placeholder={'E-mail'}
          width={'90%'}
          onChangeText={text=>setEmail(text)}
          border={true}
          icon={
            <Image
              source={require('../../assets/images/user.png')}
              style={{width: 25, height: 25, resizeMode: 'contain'}}
            />
          }
        />
        <CustomTextInput
          placeholder={'Password'}
          width={'90%'}
          border={true}
          secureTextEntry={secureTextEntry}
          onChangeText={text=>setPassword(text)}
          icon={
            <TouchableOpacity onPress={handleSecureTextEntry}>
              <Image
                source={
                  secureTextEntry
                    ? require('../../assets/images/hide.png')
                    : require('../../assets/images/view.png')
                }
                style={{width: 25, height: 25, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          }
        />
        <CustomButton width={'90%'} text={'Login'} onPress={handleLogin} />
      </ScrollView>
    </View>
  );
};

export default Login;
