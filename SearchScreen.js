import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, ListView, Button, TouchableHighlight } from 'react-native';


export default class SearchScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: 'Pizza',
      dataSource: []
    },
    this.dataSource = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2
    })
  }
  componentDidMount() {
  }
  
  render() {
    const rows = this.dataSource.cloneWithRows(this.state.dataSource)
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Search for a Food!
        </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
            onPress={this._findFood}
            title="Search"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />

        <ListView
        dataSource={rows}
        renderRow={(rowData) => <TouchableHighlight style={styles.button}><Text style={styles.text}>{rowData.name}</Text></TouchableHighlight>}
      />
      </View>
    );
  }
  _findFood = () =>{
    return fetch('https://api.nal.usda.gov/ndb/search/?format=json&q='+ this.state.text +'&sort=n&max=25&offset=0&api_key=7tUFd3p3se0gUepC4xcqRuPmo745qb1KcahdfleP')
      .then((response) => response.json())
      .then((responseJson) => {
          this.setState({
            dataSource: responseJson.list.item,
          });
      })
      .catch((error) => {
          this.setState({
            dataSource: [{name: "No Data Found", ndbno:":("}],
          });
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  button: {
    backgroundColor: '#33AAFF',
    borderWidth: 1,
    borderColor: "black"
  },
  text: {
    color: 'white'
  }
});