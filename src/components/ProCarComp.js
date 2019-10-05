import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const ProCarComp = props => (
  <TouchableOpacity style={{flex: 1, padding: 10}} activeOpacity={1}>
    <View style={{backgroundColor: '#fff'}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 10000,
          bottom: 3,
          left: 40,
          right: 40,
          backgroundColor: '#fff',
          borderRadius: 30,
          padding: 15,
          elevation: 3,
        }}>
        <Text style={{textAlign: 'center', fontFamily: 'ProductSans-Black',fontSize:17}}>
          {props.name}
        </Text>
      </View>
      <View
        style={{
          height: props.height, //150
          backgroundColor: '#fff',
          margin: 10,
          width: props.width, //200
          borderRadius: 10,
          elevation: 3,
        }}>
        <Image
          style={{flex: 1, borderRadius: 10}}
          resizeMode="cover"
          source={{
            uri: props.image,
          }}
        />
      </View>
    </View>
  </TouchableOpacity>
);
export default ProCarComp;
