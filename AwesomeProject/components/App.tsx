import moment from "moment";
import React, { useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Todo, addTodo, completeTodo, removeTodo } from '../redux/reducers/store';

const App = () => {
      const dispatch = useDispatch();
      const todos = useSelector((state: RootState) => state.todos);
      const [todoTitle, setTodoTitle] = useState('');
      const [todoCategory, setTodoCategory] = useState('');
      const [modalVisible, setModalVisible] = useState(false);

      const handleAddTodo = () => {
            if (todoTitle.trim()) {
                  dispatch(addTodo(todoTitle));
                  setTodoTitle('');
                  setModalVisible(!modalVisible)
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
                  <View style={{ marginBottom: 10, marginLeft: 15 }}>
                        <Text style={styles.todos}>
                              {item.text}
                        </Text>
                        <Text>
                              {item.category}
                        </Text>
                  </View>

                  <TouchableOpacity onPress={() => handleRemoveTodo(item.id)}>
                        <Text style={{ marginLeft: 10, color: 'blue', marginBottom: 21 }}>X</Text>
                  </TouchableOpacity>
            </View>
      );

      return (
            <SafeAreaView style={{ margin: 20 }}>
                  <View>
                        <Text style={styles.date}>
                              {
                                    moment(new Date()).format('MMMM Do YYYY')
                              }
                        </Text>
                        <View style={styles.rate}>
                              <Text style={styles.rateText}>
                                    {todos.filter((todo) => !todo.completed).length} Completed,
                              </Text>
                              <Text style={styles.rateText}>
                                    {todos.filter((todo) => todo.completed).length} Incompleted
                              </Text>
                        </View>
                        <View style={{ width: "100%", height: 3, backgroundColor: "#D0D0D0", borderRadius: 10, marginBottom: 10 }}>
                        </View>
                  </View>
                  <View>
                        <>
                              <Text style={styles.comp}>
                                    Incomplate
                              </Text>
                              <FlatList
                                    style={{ marginTop: 20 }}
                                    data={todos.filter((todo) => !todo.completed)}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderItem}
                              />
                        </>
                        <>
                              <Text style={styles.comp}>
                                    Complated
                              </Text>
                              <FlatList
                                    style={{ marginTop: 20 }}
                                    data={todos.filter((todo) => todo.completed)}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderItem}
                              />
                        </>
                  </View>
                  <View style={styles.centeredView}>
                        <Modal
                              animationType="slide"
                              transparent={true}
                              visible={modalVisible}
                              onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                    setModalVisible(!modalVisible);
                              }}>
                              <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                          <>
                                                <TextInput
                                                      style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: "lightgrey", borderRadius: 8 }}
                                                      placeholder="Enter a todo title"
                                                      value={todoTitle}
                                                      onChangeText={(text) => setTodoTitle(text)}
                                                />
                                                <TextInput
                                                      style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: "lightgrey", borderRadius: 8 }}
                                                      placeholder="Enter a todo category"
                                                      value={todoCategory}
                                                      onChangeText={(text) => setTodoCategory(text)}
                                                />
                                          </>
                                          <TouchableOpacity
                                                style={[styles.button1, styles.buttonClose]}
                                                onPress={handleAddTodo}>
                                                <Text style={styles.textStyle}>Add Todo</Text>
                                          </TouchableOpacity>
                                          <TouchableOpacity
                                                style={[styles.button1, styles.buttonClose]}
                                                onPress={() => setModalVisible(!modalVisible)}>
                                                <Text style={styles.textStyle}>Hide Modal</Text>
                                          </TouchableOpacity>
                                    </View>
                              </View>
                        </Modal>
                        <TouchableOpacity
                              style={styles.button}
                              onPress={() => setModalVisible(true)}>
                              <Text style={{ fontSize: 25, color: "white" }}>+</Text>
                        </TouchableOpacity>
                  </View>
            </SafeAreaView>
      );
};

export default App;

const styles = StyleSheet.create({

      date: {
            fontSize: 32,
            fontWeight: "700",
            color: "#0E0E11",
            marginBottom: 13,
      },
      rate: {
            flexDirection: "row",
            marginBottom: 20,
      },
      rateText: {
            fontWeight: "600",
            fontSize: 14,
            color: "#575767",
      },
      comp: {
            fontSize: 18,
            fontWeight: "700",
            color: "#575767",
      },
      centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
      },
      modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 55,
            shadowColor: '#000',
            shadowOffset: {
                  width: 0,
                  height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
      },
      button: {
            borderRadius: 50,
            padding: 10,
            elevation: 2,
            backgroundColor: '#414ca0',
            // position: 'absolute',
            // bottom: -520,
            // right: 0,
            width: 60,
            height: 60,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
      },
      button1: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            marginBottom: 10,
      },
      buttonClose: {
            backgroundColor: '#2196F3',
      },
      textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
      },
      modalText: {
            marginBottom: 15,
            textAlign: 'center',
      },
      todos: {
            fontSize: 18,
            fontWeight: "500",
            color: "#575767",
      }
})