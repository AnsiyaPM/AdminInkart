import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import {FlatList} from 'react-native-gesture-handler';
import {useDimensionContext} from '../../context/Index';
import style from './Style';
import NavigationBack from '../../common/NavigationBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../components/CustomTextInput/Index';
import CustomButton from '../../components/CustomButton/Index';
import Clipboard from '@react-native-clipboard/clipboard';

const Offers = () => {
  const dimensions = useDimensionContext();
  const responsiveStyle = style(
    dimensions.windowWidth,
    dimensions.windowHeight,
    dimensions.isPortrait,
  );
  const actionSheetRef = useRef(null);
  const actionSheetRefChooseOption = useRef(null);
  const [head, setHead] = useState('');
  const [subhead, setSubhead] = useState('');
  const [offer, setOffer] = useState('');
  const [offerCode, setOfferCode] = useState('');
  const navigation = useNavigation();
  const [offers, setOffers] = useState([]);
  const [type, setType] = useState(null);
  const [selected, setSelected] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setType('add');
          actionSheetRef.current?.show();
        }}>
        <AntDesign name="plussquareo" size={30} color={colors.grey} />
      </TouchableOpacity>
    );
  };
  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'no offers found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setSelected(null);
          setOffers(objArray);
        }
      });
  };

  const handleCreate = async () => {};

  const handleEdit = async () => {
    actionSheetRef.current?.hide();
    setTimeout(() => {
      setHead(selected.head);
      setSubhead(selected.subhead);
      setOffer(selected.offer);
      setOfferCode(selected.offerCode);
      setType('edit');
      actionSheetRef.current?.show();
    }, 1000);
  };

  const handleCopy = async () => {
    actionSheetRef.current?.hide();
    setTimeout(() => {
      Clipboard.setString(selected.offerCode);
    }, 1000);
  };

  const handleDelete = async () => {
    actionSheetRef.current?.hide();
    Alert.alert(
      'Confirm Offers Deletion',
      'Do you want to delete this product',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete Offer ',
          onPress: async () => {
            await firestore()
              .collection('Offers')
              .doc(selected.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Offers Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              });
            getOffers();
          },
        },
      ],
    );
  };

  const handleUpdateOffer = async () => {};

  return (
    <View style={responsiveStyle.main}>
      <ScrollView style={responsiveStyle.container}>
        <ActionSheet ref={actionSheetRef}>
          <View style={{padding: 15}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: colors.black_level_3,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.primaryGreen,
                }}>
                {type === 'add' ? 'Create Offer' : 'Update offer'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef.current?.hide();
                  setType(null);
                  setSelected(null);
                  setHead('');
                  setSubhead('');
                  setOffer('');
                  setOfferCode('');
                }}>
                <AntDesign name="closecircleo" size={30} color={colors.grey} />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 20}}>
              <CustomTextInput
                placeholder={'Head'}
                width={'100%'}
                value={head}
                onChangeText={text => setHead(text)}
                border={true}
              />
              <CustomTextInput
                placeholder={'Description'}
                width={'100%'}
                value={subhead}
                onChangeText={text => setSubhead(text)}
                border={true}
              />

              <CustomTextInput
                placeholder={'Offer percentage'}
                width={'100%'}
                value={offer}
                onChangeText={text => setOffer(text)}
                border={true}
              />
              <CustomTextInput
                placeholder={'Offer code'}
                width={'100%'}
                value={offerCode}
                onChangeText={text => setOfferCode(text)}
                border={true}
              />
              <CustomButton
                text={type === 'add' ? 'Create' : 'Upadate'}
                width={'100%'}
                onPress={type === 'add' ? handleCreate : handleUpdateOffer}
              />
            </View>
          </View>
        </ActionSheet>

        <ActionSheet ref={actionSheetRefChooseOption}>
          <View style={{padding: 15}}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: colors.black_level_3,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}>
              <Text
                style={{
                  fontFamily: 'Lato-Bold',
                  fontSize: 18,
                  color: colors.primaryGreen,
                }}>
                Choose Action
              </Text>
              <TouchableOpacity
                onPress={() => actionSheetRefChooseOption.current?.hide()}>
                <AntDesign name="closecircleo" size={30} color={colors.grey} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                margin: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Feather
                onPress={handleEdit}
                name="edit"
                size={30}
                color={colors.black_level_2}
              />
              <AntDesign
                onPress={handleCopy}
                name="copy1"
                size={30}
                color={colors.black_level_2}
              />
              <AntDesign
                onPress={handleDelete}
                name="delete"
                size={30}
                color={colors.black_level_2}
              />
            </View>
          </View>
        </ActionSheet>

        <FlatList
          data={offers}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          contentContainerStyle={responsiveStyle.contenStyle}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  actionSheetRefChooseOption.current.show();
                }}
                style={responsiveStyle.renderview}>
                {/* start design */}
                <View style={responsiveStyle.offCircleView}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
                <View
                  style={{
                    width: '65%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    padding: 20,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Bold',
                        color: colors.primaryGreen,
                        fontSize: 50,
                      }}>
                      {item.offer}
                    </Text>
                    <View>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 14,
                        }}>
                        {' '}
                        %
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.primaryGreen,
                          fontSize: 14,
                        }}>
                        OFF
                      </Text>
                    </View>
                    <View style={{marginLeft: 10}}>
                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black,
                          fontSize: 16,
                        }}>
                        {item.head}
                      </Text>

                      <Text
                        style={{
                          fontFamily: 'Lato-Regular',
                          color: colors.black_level_3,
                          fontSize: 12,
                        }}>
                        {item.subhead}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                  }}>
                  <View style={responsiveStyle.circleCenter}></View>
                  <View
                    style={[
                      responsiveStyle.circleCenter,
                      {marginBottom: -25 / 2},
                    ]}></View>
                </View>
                <View
                  style={{
                    width: '25%',
                    height: 100,
                    backgroundColor: colors.secondaryGreen,
                    paddingRight: 15,
                    paddingLeft: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Lato-Regular',
                      color: colors.black_level_3,
                      fontSize: 13,
                    }}>
                    Use Code
                  </Text>
                  <View
                    style={{
                      marginVertical: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      justifyContent: 'center',
                      borderRadius: 15,
                      backgroundColor: colors.primaryGreen,
                      overflow: 'hidden',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Lato-Regular',
                        color: colors.white,
                        textAlign: 'center',
                      }}>
                      {item.offerCode}
                    </Text>
                  </View>
                </View>
                {/* end design */}
                <View style={{marginLeft: -25 / 2}}>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                  <View style={responsiveStyle.circleRight}></View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default Offers;
