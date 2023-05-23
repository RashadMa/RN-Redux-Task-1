import { View, Text, FlatList, } from 'react-native'
import React, { useState } from 'react'
import { useApiData } from './useApiData'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'

const Suppliers = () => {
      const { data, loading, error } = useApiData('products')
      const [value, setValue] = useState('')
      let dispatch = useDispatch()
      const addToFavorites = (item: any) => {
            dispatch({ type: 'ADD_TO_FAVORITES', payload: item })
            console.log(item.name);

      }
      return (<View style={{flex:1}}>{
            loading ? <Text>loading...</Text> : <FlatList
                  
                  data={data}
                  renderItem={({ item }: any) => <Button onPress={() => addToFavorites(item)}>{item.name}</Button>}
            />
      }
      </View>
      )
}

export default Suppliers