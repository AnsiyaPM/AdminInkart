import RNFetchBlob from 'rn-fetch-blob';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';

const uploadImage = path => {
  return new Promise(async resolve => {
    try {
      const uri = path;
      const filename = uri.substring(uri.lastIndexOf('/') + 1); // /kazha contents aanu name
      const pathforFirebaseStorage = await getPathForFirebaseStorage(uri);
      await storage().ref(filename).putFile(pathforFirebaseStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => resolve(url));
    } catch (error) {}
  });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNFetchBlob.fs.stat(uri); // correct path android kittan
  return stat.path;
};
export default uploadImage;
