import {StyleSheet} from 'react-native';
import colors from '../../common/colors';


const style = (width, height) =>
  StyleSheet.create({
    descriptionHead: {
      fontFamily: 'Lato-Bold',
      fontSize: 18,
    },
    description: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.gery,
    },
    commonText: {
      fontFamily: 'Lato-Regular',
      fontSize: 16,
      color: colors.shadow,
      lineHeight: 25,
    },
    deliveryHead: {fontFamily: 'Lato-Bold', fontSize: 18, marginBottom: 10},
  });

export default style;
