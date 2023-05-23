import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Todo, addTodo, completeTodo, removeTodo } from '../redux/reducers/store';
import { Checkbox } from 'react-native-paper';
import moment from "moment";

const App = () => {
      const dispatch = useDispatch();
      const todos = useSelector((state: RootState) => state.todos);
      const [todoTitle, setTodoTitle] = useState('');
      const [todoCategory, setTodoCategory] = useState('');

      const handleAddTodo = () => {
            if (todoTitle.trim()) {
                  dispatch(addTodo(todoTitle));
                  setTodoTitle('');
            }
      };

      const handleRemoveTodo = (id: number) => {
            dispatch(removeTodo(id));
      };

      const handleCompleteTodo = (id: number) => {
            dispatch(completeTodo(id));
      };

      const renderItem = ({ item }: { item: Todo }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* <Checkbox
        value={item.completed}
        onValueChange={() => handleCompleteTodo(item.id)}
      /> */}
                  <Text>
                        {item.text}
                  </Text>
                  <Text>
                        {item.category}
                  </Text>
                  <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
                        <Text style={{ marginLeft: 10, color: 'blue' }}>X</Text>
                  </TouchableOpacity>
            </View>
      );

      return (
            <SafeAreaView style={{ margin: 20 }}>
                  <View>
                        <Text>
                              {
                                    moment(new Date()).format('MMMM Do YYYY')
                              }
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                              <Text>
                                    {todos.filter((todo) => !todo.completed).length} Completed,
                              </Text>
                              <Text>
                                    {todos.filter((todo) => todo.completed).length} Incompleted
                              </Text>
                        </View>
                  </View>
                  <View>
                        <TextInput
                              style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
                              placeholder="Enter a todo title"
                              value={todoTitle}
                              onChangeText={(text) => setTodoTitle(text)}
                        />
                         <TextInput
                              style={{ marginBottom: 10, padding: 10, borderWidth: 1 }}
                              placeholder="Enter a todo category"
                              value={todoCategory}
                              onChangeText={(text) => setTodoCategory(text)}
                        />
                        <TouchableOpacity>
                              <Text style={{ color: "blue" }} onPress={handleAddTodo}>
                                    Add Todo
                              </Text>
                        </TouchableOpacity>
                        <FlatList
                              style={{ marginTop: 20 }}
                              data={todos.filter((todo) => !todo.completed)}
                              keyExtractor={(item) => item.id.toString()}
                              renderItem={renderItem}
                        />
                        <Text>
                              Complated
                        </Text>
                        <FlatList
                              style={{ marginTop: 20 }}
                              data={todos.filter((todo) => todo.completed)}
                              keyExtractor={(item) => item.id.toString()}
                              renderItem={renderItem}
                        />
                  </View>
            </SafeAreaView>
      );
};

export default App;

const styles = StyleSheet.create({

})