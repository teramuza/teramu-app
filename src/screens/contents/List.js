import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';


type Props = {};
class List extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })
  renderItem = ({ item, index }) => (
    <ListItem key={index} thumbnail>
            <Left>
                <Thumbnail square source={item.image } />
            </Left>
            <Body>
                <Text style={{fontSize: 14, color: '#f0f0f0'}}>{item.title}</Text>
            </Body>
            <Right>
            </Right>
        </ListItem>
  )

  _keyExtractor = (item, index) => index.toString();

  render() {
    const data = [
      {image : require('../../assets/img/cover1.jpg'), title : 'JPop 2016'},
      {image : require('../../assets/img/cover2.jpg'), title : 'Anime Opening & Ending'},
      {image : require('../../assets/img/cover3.jpeg'), title : 'JPop 2019'},
      {image : require('../../assets/img/cover4.jpeg'), title : 'Tokyo Rising'},
      {image : require('../../assets/img/cover5.jpg'), title : 'Nihon Zone'},
      {image : require('../../assets/img/cover6.jpeg'), title : 'Release Radar'}
    ]
    return (
      <Container>
      <StatusBar hidden={false}/>

        <Header searchBar rounded style={{backgroundColor: '#303030'}} androidStatusBarColor='#212121'>        
            <View style={{paddingTop: 17}}>
                <Text style={{color: '#f0f0f0', fontSize: 18, fontWeight:'600'}}>Cari</Text>
            </View>
        </Header>


        <Content style={{backgroundColor: '#212121'}}>
            <View style={{paddingTop: 20, paddingLeft: 10}}>
                <Text style={{fontSize: 17, fontWeight: '500', paddingBottom: 10, color: '#f0f0f0'}}>Riwayat Pencarian</Text>
            </View>
            <List>
              <FlatList
                data={data}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderItem}
              />
            </List>
        </Content>
      </Container>
    );
  }


}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(List)