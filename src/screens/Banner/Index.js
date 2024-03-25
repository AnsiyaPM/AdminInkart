import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavigationBack from '../../common/NavigationBack';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton/Index';
import style from './Style';
import CustomTextInput from '../../components/CustomTextInput/Index';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import uploadImage from '../../common/storage';

const Banner = () => {
  const actionSheetRef = useRef(null);
  const {width, height} = Dimensions.get('screen');
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const [head, setHead] = useState('');
  const [desc, setDesc] = useState('');
  const [uploadUri, setUploadUri] = useState(null);
  const [type, setType] = useState(null);
  const [bannerId, setBAnnerId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
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

  useFocusEffect(
    useCallback(() => {
      getBanners();
    }, []),
  );

  const getBanners = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banner found',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.red,
            textColor: colors.white,
          });
        } else {
          const objArray = [];
          snapshot.docs.forEach(document => {
            const result = {id: document.id, ...document.data()};
            objArray.push(result);
          });
          setBanners(objArray);
        }
      })
      .catch(error => {
        console.error('Error getting banners:', error);
      });
  };

  //   const handleCamera = () => {
  //     ImagePicker.openCamera({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //     })
  //       .then(image => {
  //         setModalChoose(false);
  //         console.log(image);
  //         if (image && image.cropRect) {
  //           setProductImage(image?.cropRect[0]?.uri);
  //         }
  //       })
  //       .catch(err => {
  //         console.warn(err);
  //       });
  //   };

  const handleGallery = async () => {
    const options = {mediaType: 'photo'};
    await launchImageLibrary(options, response => {
      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  const handleCamera = async () => {
    const options = {mediaType: 'photo'};
    await launchCamera(options, response => {
      console.log('fs', response);

      if (response && response.assets) {
        setUploadUri(response?.assets[0]?.uri);
      }
    });
  };

  //   const handleGallery = () => {
  //     ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       cropping: true,
  //     })
  //       .then(image => {
  //         console.warn(image);
  //         actionSheetRef.current?.hide();
  //         if (image && image.cropRect) {
  //           setProductImage(image?.cropRect[0]?.uri);
  //         }
  //       })
  //       .catch(err => {
  //         console.warn(err);
  //       });
  //   };

  const handleCreateBanner = async () => {
    if (uploadUri && head !== '' && desc !== '') {
      const responseUri = await uploadImage(uploadUri);
      const product = {
        description: desc,
        head: head,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Added successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });
          actionSheetRef.current?.hide();
          setHead('');
          setDesc('');
          setUploadUri(null);
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  const handleDelete = async bannerData => {
    Alert.alert(
      'Confirm banner Deletion',
      'Do you want to delete this product',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete Banner',
          onPress: async () => {
            await firestore()
              .collection('Banners')
              .doc(bannerData.id)
              .delete()
              .then(() => {
                Snackbar.show({
                  text: 'Banner Deleted successfully',
                  duration: Snackbar.LENGTH_LONG,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white,
                });
              });
            getBanners();
          },
        },
      ],
    );
  };
  const handleEdit = async bannerData => {
    setBAnnerId(bannerData.id);
    setHead(bannerData.head);
    setDesc(bannerData.description);
    setUploadUri(bannerData.image);
    setType('update');
    actionSheetRef.current?.show();
  };

  const handleUpdateSubmit = async () => {
    if (bannerId && uploadUri && head !== '' && desc !== '') {
      const responseUri = uploadUri.includes('files://')
        ? await uploadImage(uploadUri)
        : uploadUri;
      const product = {
        description: desc,
        head: head,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .doc(bannerId)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated successfully',
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
          });
          actionSheetRef.current?.hide();
          setHead('');
          setDesc('');
          setUploadUri(null);
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill up all the fields to continue.',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: colors.red,
        textColor: colors.white,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
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
              {type === 'add ' ? 'Create Banner' : 'Update Banner'}
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
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
              value={desc}
              multiline={true}
              onChangeText={text => setDesc(text)}
              border={true}
            />

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                marginVertical: 10,
                borderColor: colors.primaryGreen,
                borderWidth: 1,
                borderRadius: 8,
              }}>
              <Text
                style={{
                  color: colors.black_level_2,
                  fontSize: 16,
                  fontFamily: 'Lato-Regular',
                  lineHeight: 55,
                }}>
                Upload Image
              </Text>
              {uploadUri ? (
                <View>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      zIndex: 9,
                      right: 0,
                      top: -10,
                      backgroundColor: colors.white_level_3,
                      borderRadius: 25,
                      overFlow: 'hidden',
                    }}
                    onPress={() => setUploadUri(null)}>
                    <AntDesign
                      name="closecircleo"
                      size={25}
                      color={colors.black_level_2}
                    />
                  </TouchableOpacity>
                  <Image
                    source={{uri: uploadUri}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
              ) : (
                <Entypo name="images" size={40} color={colors.black_level_2} />
              )}
            </View>
            <View
              style={{
                paddingBottom: 50,
                padding: 20,
                justifyContent: 'space-around',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={handleCamera}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <AntDesign
                  name="camerao"
                  size={40}
                  color={colors.primaryGreen}
                />
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 18,
                    fontFamily: 'Lato-Regular',
                  }}>
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGallery}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Entypo name="image" size={40} color={colors.primaryGreen} />
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontSize: 18,
                    fontFamily: 'Lato-Regular',
                  }}>
                  Gallery
                </Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              text={type === 'add' ? 'Create Banner' : 'Update Banner'}
              width={'100%'}
              onPress={type === 'add' ? handleCreateBanner : handleUpdateSubmit}
            />
          </View>
        </View>
      </ActionSheet>
      <FlatList
        data={banners}
        keyExtractor={(item, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignSelf: 'center', paddingBottom: 100}}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={{
                width: width * 0.9,
                height: height * 0.4,
                resizeMode: 'cover',
                borderRadius: 10,
                overflow: 'hidden',
                marginTop: 10,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.white_level_3,
                  borderRadius: 10,
                  overflow: 'hidden',
                  padding: 10,
                  zIndex: 9,
                }}>
                <Feather
                  name="edit"
                  size={25}
                  color={colors.black_level_2}
                  onPress={() => handleEdit(item)}
                />
                <AntDesign
                  name="delete"
                  size={25}
                  color={colors.black_level_2}
                  style={{marginLeft: 10}}
                  onPress={() => handleDelete(item)}
                />
              </View>
              <View style={{padding: 20}}>
                <Text
                  style={{
                    color: colors.black_level_3,
                    fontFamily: 'Lato-Black',
                    fontSize: 30,
                  }}>
                  {item.head}
                </Text>
                <Text
                  style={{
                    color: colors.black_level_2,
                    fontFamily: 'Lato-Regular',
                    fontSize: 16,
                    marginTop: 50,
                  }}>
                  {item.description}
                </Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};

export default Banner;
