import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail } from 'native-base';


type Props = {};
class Favorite extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })
  renderItem = ({ item, index }) => (
    <ListItem noBorder key={index} thumbnail style={{paddingVertical: 5}}  onPress={()=> this.props.navigation.navigate('player', {pushData : [item],from : 'Paling sering di dengar', paused : false})}>
            <Left>
                <Thumbnail square source={{uri : item.artCover }}/>
            </Left>
            <Body>
                <Text style={{fontSize: 14, color: '#f0f0f0'}}>{item.title}</Text>
                <Text style={{fontSize: 13, color: '#969696'}}>{item.artist}</Text>

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
                <Text style={{color: '#f0f0f0', fontSize: 18, fontWeight:'600'}}>Favorit</Text>
            </View>
        </Header>
        <Content style={{backgroundColor: '#212121'}}>
        <View style={{paddingTop: 20, paddingHorizontal: 100}}>
                  <Button block 
                  style={{backgroundColor: '#26A69A', borderRadius: 50, alignItems: 'center'}}  
                  onPress={()=> this.props.navigation.navigate('player', {
                    pushData : this.props.songs.data ,
                    from : 'semua paling sering di dengar', 
                    paused : false})}
                  >
                    <Text style={{paddingHorizontal: 20}}>PUTAR SEMUA</Text>
                  </Button>
              </View>
            <View style={{paddingTop: 20, paddingLeft: 15}}>
                <Text style={{fontSize: 17, fontWeight: '500', paddingBottom: 10, color: '#f0f0f0'}}>Paling sering di dengar</Text>
            </View>
            <List>
              <FlatList
                data={this.props.songs.data}
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
    songs : state.songs
    
  }
}

export default connect(mapStateToProps)(Favorite)