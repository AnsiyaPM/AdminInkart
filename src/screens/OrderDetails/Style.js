import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = (width, height, isPortrait) =>
  StyleSheet.create({
    container: {flex: 1},
    scrollView: {padding: width * 0.04},
    contentContainerStyle: {paddingBottom: height * 0.15},
    greenBox: {
      marginVertical: width * 0.04,
      backgroundColor: colors.primaryGreen,
      borderRadius: width * 0.04,
      padding: 20,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    greenTextBox: {marginLeft: width * 0.04},
    orderId: {
      color: colors.white,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
    orderStatus: {
      color: colors.white,
      fontFamily: 'Lato-Black',
      fontSize: 20,
    },
    title: {
      color: colors.primaryGreen,
      fontFamily: 'Lato-Bold',
      fontSize: 20,
    },
    mapStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    mapInner: {
      backgroundColor: colors.primaryGreen,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      marginRight: 15,
    },
    quantity: {
      color: colors.white,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    name: {
      color: colors.black,
      fontFamily: 'Lato-Regular',
      fontSize: 18,
    },
    desc: {
      color: colors.black_level_3,
      fontFamily: 'Lato-Light',
      fontSize: 15,
    },
    price: {
      color: colors.black_level_3,
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    textStyle: {
      lineHeight: 25,
      color: colors.red,
      fontFamily: 'Lato-Regular',
      fontSize: 16,
    },
  });

export default style;
