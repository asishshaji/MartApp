import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Text,
  BackHandler,
  TouchableOpacity,
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import ProCarComp from '../components/ProCarComp';

import RNUpiPayment from 'react-native-upi-payment';

let d = [];

const productChart = {
  Milk: {
    price: 100,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPuzuTO4-N7q9CdtezmsnIYM40D0yF11QW1bFBzsLha0E3dp8_',
  },
  Cabbage: {
    price: 120,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjMvePvhVbfgdvd9I-rFSTSfp9eoJ-yK1Yb4KybC6N2fd6eK3r',
  },
  Tomato: {
    price: 200,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1CY2HcdMXGhPEDmbDhi2_PisiDGH0SZvhTciRc1lpBH05IQ_u',
  },
  Pen: {
    price: 10,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyg94Lex-c4psjXW_GMFBdAuvyUbSvtd0qI5cayKXrcGljAb6G',
  },
  Pencil: {
    price: 5,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTzyCRK4xSlcs7jXsRqoH-OP1D_nX-MyJmbKHIBIrNCeYBwJOdP',
  },
};

class ProductsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      addedProducts: [],
      totalCost: 0,
    };
    const data = this.props.navigation.getParam('data');
    data.forEach(element => {
      element.forEach(vals => {
        d.push(vals);
      });
    });
    d.forEach(elem => {
      const prodName = elem.split('-')[0].trim();
      const numberOfProd = elem.split('-')[1].trim();

      this.setState({
        addedProducts: this.state.addedProducts.push({
          name: prodName,
          number: numberOfProd,
        }),
      });
    });
    data.forEach(element => {
      element.forEach(vals => {
        d.push(vals);
      });
    });
    d.forEach(elem => {
      const prodName = elem.split('-')[0].trim();
      const numberOfProd = elem.split('-')[1].trim();

      this.setState({
        addedProducts: this.state.addedProducts.concat({
          name: prodName,
          number: numberOfProd,
        }),
      });
    });
  }
  componentDidMount() {
    let cost = 0;
    this.state.addedProducts.forEach(val => {
      cost += productChart[val.name].price * val.number;
    });
    this.setState({totalCost: cost});
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    return true;
  };
  successCallback = data => {
    // do whatever with the data
  };

  failureCallback = data => {
    // do whatever with the data
  };
  render() {
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
        <View style={{}}>
          <Text
            style={{
              fontFamily: 'ProductSans-Black',
              fontSize: 30,

              marginTop: 45,
              textAlign: 'center',
              alignSelf: 'center',
            }}>
            Added products
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={{}}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 5,
            height: height - 140,
          }}>
          {this.state.addedProducts.map(val => (
            <ProCarComp
              name={val.name}
              height={height - 160}
              width={width - 60}
              image={productChart[val.name].imageUrl}
            />
          ))}
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 10,
            backgroundColor: '#fdfdfd',
            height: 60,
            width: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 3,
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              RNUpiPayment.initializePayment(
                {
                  vpa: 'john@upi', // or can be john@ybl or mobileNo@upi
                  payeeName: 'John Doe',
                  amount: '1',
                  transactionRef: 'aasf-332-aoei-fn',
                },
                () => {
                  alert('Succes');
                },
                () => {
                  alert('Failure');
                },
              );
            }}>
            <Text style={{fontFamily: 'ProductSans-Black', fontSize: 15}}>
              ₹{this.state.totalCost}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
