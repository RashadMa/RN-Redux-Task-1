import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Suppliers from '../customHooks/Supliers'
import Favorites from './Favorites'

const Homescreen = () => {
      return (
            <View style={{flex:1}}>
                  <Suppliers />
                  <Favorites />
                  
            </View>
      )
}

export default Homescreen

const styles = StyleSheet.create({})