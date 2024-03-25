@echo off
"C:\\Program Files\\Android\\Android Studio\\jbr\\bin\\java" ^
  --class-path ^
  "C:\\Users\\Lenovo\\.gradle\\caches\\modules-2\\files-2.1\\com.google.prefab\\cli\\2.0.0\\f2702b5ca13df54e3ca92f29d6b403fb6285d8df\\cli-2.0.0-all.jar" ^
  com.google.prefab.cli.AppKt ^
  --build-system ^
  cmake ^
  --platform ^
  android ^
  --abi ^
  x86 ^
  --os-version ^
  21 ^
  --stl ^
  c++_shared ^
  --ndk-version ^
  25 ^
  --output ^
  "C:\\Users\\Lenovo\\AppData\\Local\\Temp\\agp-prefab-staging2971505230092459648\\staged-cli-output" ^
  "C:\\Users\\Lenovo\\.gradle\\caches\\transforms-3\\1164178e5e40cff4b6777f169f78763a\\transformed\\jetified-react-android-0.73.5-debug\\prefab" ^
  "C:\\Users\\Lenovo\\.gradle\\caches\\transforms-3\\32b9d5f4760a4d065d6541802a97f8c7\\transformed\\jetified-fbjni-0.5.1\\prefab" ^
  "C:\\Users\\Lenovo\\.gradle\\caches\\transforms-3\\35e11207c95ca0cf438634cf5998e3de\\transformed\\jetified-hermes-android-0.73.5-debug\\prefab" ^
  "C:\\Users\\Lenovo\\Desktop\\Project\\InkartAdminApp\\node_modules\\react-native-reanimated\\android\\build\\intermediates\\prefab_package\\debug\\prefab"
