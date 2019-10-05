import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import QRCodeScanner from './src/screens/QRCodeScannerScreen';
import ProductsScreen from './src/screens/ProductsScreen';

const AppNavigator = createStackNavigator(
  {
    CamScreen: {
      screen: QRCodeScanner,
    },
    ProductsScreen: {
      screen: ProductsScreen,
    },
  },
  {
    initialRouteName: 'CamScreen',
    unmountInactiveRoutes: true,
  },
);
export default createAppContainer(AppNavigator);
