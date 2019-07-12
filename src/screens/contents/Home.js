import React, { Component } from 'react';
import { ScrollView, Platform, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Dimensions, StatusBar, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Left, Body, Right, Card,View, CardItem, Text, Fab, Icon, Badge, Header,Button, Title, Item, Input, List, ListItem, Thumbnail, Footer } from 'native-base';

import { getSongs } from '../../publics/redux/actions/songs'

type Props = {};
class Home extends Component<Props> {

	static navigationOptions = ({ navigation }) => ({
		header: null,
	})

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	paused : false,
	  	isFav : false,
	  };
	}
	async fetchData(){
		try{
			const token = await AsyncStorage.getItem('token')
			await this.props.dispatch(getSongs(token))
		}
		catch{
			this.props.navigation.navigate('login')
		}
	}
	

	renderItem = ({ item, index }) => (
		<TouchableWithoutFeedback key={index} onPress={()=> this.props.navigation.navigate('Detail', {pushData : index})}>
			<View style={styles.gridContainer}>
				<Image source={item.image} style={{height: 180,width: 180, flex: 1}}/>
				<View style={{paddingHorizontal: 2}}>
					<Text style={styles.titleGrid}>{item.title}</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)

	renderItemHorizontal = ({ item, index }) => (
	    <TouchableWithoutFeedback key={index} onPress={()=> this.props.navigation.navigate('player', {pushData : [item],from : 'Baru Dimainkan', paused : false})}>
	     	<View style={styles.gridContainerHorizontal}>
	    		<Image source={{uri : item.artCover}} style={styles.imageGridHorizontal} style={{height: 130,width: 130}}/>
		    	<View style={{paddingHorizontal: 1}}>
		    		<Text style={styles.titleGridHorizontal}>{item.title}</Text>          
		    		<Text style={{paddingTop: 1, color: '#969696', textAlign: 'center', fontSize: 11 }}>{item.artist}</Text>          
		    	</View>
	    	</View>

	    </TouchableWithoutFeedback>
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
                    	<Text style={{color: '#f0f0f0', fontSize: 18, fontWeight:'600'}}>Beranda</Text>
                    </View>
                </Header>

				<ScrollView style={{backgroundColor: '#212121'}}>

					<View style={{paddingTop: 20}}>
			            <Text style={{fontSize: 17, fontWeight: '500', paddingBottom: 10, color: '#f0f0f0', textAlign:  'center'}}>Baru dimainkan</Text>
			        </View>

			        <FlatList
			            data={this.props.songs.data}
			            keyExtractor={this._keyExtractor}
			            renderItem={this.renderItemHorizontal}
			            horizontal={true}
			            numColumns={1}
			         />

					<View style={{ paddingTop: 20}}>
						<Text style={{fontSize: 17, fontWeight: '500', paddingBottom: 10, color: '#f0f0f0', textAlign:  'center'}}>Dibuat Untuk Kamu</Text>
					</View>
					<FlatList
						data={data}
						keyExtractor={this._keyExtractor}
						renderItem={this.renderItem}
						numColumns={2}
					/>
					<View style={{paddingHorizontal: 120, marginVertical: 20}}>
						<Button block small style={{backgroundColor: '#212121', borderRadius: 50, borderColor: '#828282', borderWidth: 1}}><Text style={{color: '#969696', fontSize: 10}}>LIHAT LAINNYA</Text></Button>
					</View>
				</ScrollView>
				{this.miniPlayer()}
			</Container>
		);
	}

	miniPlayer() {
		return(
			<Footer style={{backgroundColor: '#373737'}}>
				<View style={{flexDirection: 'row', flex : 1, flexWrap: 'wrap', }}>
					<View style={{flex : 1, alignItems: 'center',marginTop: 15 }}>
						{this.state.isFav ? 
							<Icon name="favorite" type="MaterialIcons" style={{color: '#f0f0f0'}}/> 
							: 
							<Icon name="favorite-border" type="MaterialIcons" style={{color: '#f0f0f0'}}/> 
						}
					</View>
					<View style={{flex : 6, alignItems: 'center', marginTop: 10}}>
						<Text style={{color: '#f0f0f0', fontSize: 14}}>Centimental Crisis</Text>
						<Text style={{color: '#969696', fontSize: 12}}>halca</Text>

					</View>
					<View style={{flex : 1, alignItems: 'center', marginTop: 15}}> 
						{this.state.paused ? 
							<Icon name="play" style={{color: '#f0f0f0'}}/>
						:
							<Icon name="pause" style={{color: '#f0f0f0'}}/>
						}
					</View>
				</View>
			</Footer>
		)
	}

}

const mapStateToProps = (state) => {
	return {
		songs : state.songs
	}
}

export default connect(mapStateToProps)(Home)

const styles = StyleSheet.create({
	  //grid Horizontal
  gridContainerHorizontal : {
    flex: 1, 
    flexDirection: 'column', 
    margin: 3, 
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  imageGridHorizontal: {
    height: 150, 
    width: null, 
    flex: 1
  },

  titleGridHorizontal : {
	textAlign: 'center', 
    color: '#f0f0f0', 
    fontSize: 12, 
    paddingTop: 5
  },

  priceGridHorizontal : {
    color: '#E64A19', 
    fontSize: 14, 
    fontWeight: 'bold',  
    paddingBottom: 5
  },

  discountGridHorizontal : {
    color: '#757575',
    fontSize: 10, 
    paddingLeft: 5
  },

  oldPriceGridHorizontal : {
    color: '#9b9b9b', 
    fontSize: 10, 
    textDecorationLine: 'line-through'
  },

	gridContainer : {
		flex: 1, 
		flexDirection: 'column', 
		margin: 3, 
		paddingHorizontal: 10,
		paddingVertical: 10,
		paddingBottom: 5
	},
	titleGrid : {
		textAlign: 'center', 
		color: '#f0f0f0', 
		fontSize: 15, 
		paddingTop: 10,
	},
	priceGrid : {
		color: '#E64A19', 
		fontSize: 16, 
		fontWeight: 'bold',  
		paddingBottom: 5
	},
	discountGrid : {
		color: '#757575',
		fontSize: 12, 
		paddingLeft: 5
	},
	oldPriceGrid : {
		color: '#9b9b9b', 
		fontSize: 13, 
		textDecorationLine: 'line-through'
	},
	featureIconContainer: {
		flexDirection: 'row', 
		marginVertical: 20
	},
	featureIconRows : {
		flex: 3,
		alignItems: 'center'
	},
	featureIcons : {
		width: 50,
		height: 50
	},
	featureIconText : {
		fontSize: 10,
		paddingTop: 5
	}

})