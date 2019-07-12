import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, Image, BackHandler } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Thumbnail, View, Left, Right, Button, Icon, Text } from 'native-base';
import { connect } from 'react-redux';

import { login } from '../../publics/redux/actions/auth'
import { getSongs } from '../../publics/redux/actions/songs'

class Login extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		
		this.state = {
			emailInput : '',
			passwordInput : '',
			nextScreen : 'home',
			where : 'login',
		};
	}

	render() {
		return (
			<Container>
			<StatusBar backgroundColor="#282828" hidden={false}/>
				<Content style={{backgroundColor: '#282828'}}>
					<View style={{alignItems: 'center', alignContent: 'center', paddingVertical: 30 }}>
						<Image style={{borderRadius: 50, height: 80, width: 80}} source={require('../../assets/img/logo1.png')} />
						<Text style={{color: '#999', paddingTop: 7, fontSize: 18 }}>t e r a m u</Text>
					</View>
					<Form>
						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Email</Label>
							<Input 
								onChangeText={(emailInput) => this.setState({emailInput})} 
								placeholderTextColor="#969696"   
								placeholder="Silahkan masukkan email anda" 
								style={{fontSize: 13, color: '#f0f0f0'}}
								autoFocus={true} 
								keyboardType="email-address"
							/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Password</Label>
							<Input 
								onChangeText={(passwordInput) => this.setState({passwordInput})} 
								placeholderTextColor="#969696" 
								style={{color: '#f0f0f0'}}
								secureTextEntry={true} 
								placeholder="Silahkan masukan password anda"
							/>
						</Item>
					</Form>

					<View style={{paddingHorizontal: 20, paddingTop: 30}}>
						{this.buttonInput()}
						<View style={{paddingTop: 25, flexDirection: 'row' }}>
							<Left>
								<Text style={{color: '#4DB6AC', fontSize: 13}} onPress={()=> this.props.navigation.navigate('register')}>Belum punya akun?</Text>
							</Left>

							<Right>
								<Text style={{color: '#4DB6AC', fontSize: 13}}>Lupa Password</Text>
							</Right>
						</View>
						<View style={{marginTop: 30 ,paddingTop : 40, paddingHorizontal: 20, height: 50}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: '#707070'}}/>
							<Text style={{position: 'absolute', zIndex: 1, top: 28, left: 138, backgroundColor: '#282828', color: '#969696', paddingHorizontal: 8, fontSize: 15 }}>Masuk dengan</Text>
						</View>
						{/*<View style={{flexDirection: 'row', paddingTop: 30, paddingHorizontal: 30, flex: 1}} >
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}} avatar source={require('../images/fb.png')}/>
							</View>
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}}  avatar source={require('../images/google.png')}/>
							</View>
							<View style={{flex : 3, paddingHorizontal: 30}}>
								<Thumbnail style={{width: 40, height: 40}}  avatar source={require('../images/line.png')}/>
							</View>

						</View>*/}
			        </View>
				</Content>
			</Container>
		);
	}

	buttonInput() {
		if(this.state.emailInput === '' || this.state.passwordInput === ''){
			return(	
				<Button disabled style={{borderRadius: 25, backgroundColor: '#609691'}} block>
					<Text style={{color: '#444'}}>Masuk</Text>
				</Button>
			)
		}else{
			return(
				<Button style={{borderRadius: 25, backgroundColor: '#26A69A'}} block onPress={() => this.handleLogin()}>
					<Text style={{color: '#282828'}}>Masuk</Text>
				</Button>
			)
		}
	}


	async handleLogin(){
		await this.props.dispatch(login({
			email : this.state.emailInput,
			password : this.state.passwordInput
		}));
		const loginInfo = this.props.auth.data
		if(loginInfo.token){
			await AsyncStorage.setItem('token', loginInfo.token)
			await this.props.dispatch(getSongs(loginInfo.token))
			this.props.navigation.navigate(this.state.nextScreen)
		}
		else if(loginInfo.message){
			Alert.alert("Ups", loginInfo.message)
		}
		else{
			Alert.alert("Error", "Terjadi suatu kesalahan, harap coba lagi nanti.")
		}
	}
	
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Login)