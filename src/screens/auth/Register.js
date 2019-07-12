import React, { Component } from 'react';
import { Alert, AsyncStorage, StatusBar, Image,BackHandler } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Thumbnail,View, Left, Right, Button,Icon, Text } from 'native-base';
import { connect } from 'react-redux';

import { register } from '../../publics/redux/actions/auth'

class Register extends Component {

	static navigationOptions = ({ navigation }) => ({
		header: null,
	})

	constructor(props) {
		super(props);
		
		this.state = {
			username : '',
			email : '',
			name : '',
			avatar : '',
			phone : '',
			password : '',
			nextScreen : 'Login',
		};
	}

	render() {
		return (
			<Container>
			<StatusBar backgroundColor="#282828"/>
				<Content style={{backgroundColor: '#282828'}}>
					<View style={{alignItems: 'center', alignContent: 'center', paddingVertical: 30 }}>
						<Image style={{borderRadius: 50, height: 80, width: 80}} source={require('../../assets/img/logo1.png')} />
						<Text style={{color: '#999', paddingTop: 7, fontSize: 18 }}>t e r a m u</Text>
					</View>
					<Form>
						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Nama Lengkap</Label>
							<Input 
							onChangeText={(name) => this.setState({name})} 
							placeholder="Silahkan masukkan Nama Lengkap anda" 
							style={{fontSize: 13, color: '#f0f0f0'}} 
							placeholderTextColor="#969696" 
							autoFocus={true}/>
						</Item>
						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Nama Pengguna</Label>
							<Input 
							onChangeText={(username) => this.setState({username})} 
							placeholder="Silahkan masukkan Nama Pengguna anda" 
							style={{fontSize: 13, color: '#f0f0f0'}} 
							placeholderTextColor="#969696" 
							/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Email</Label>
							<Input 
							onChangeText={(email) => this.setState({email})} 
							placeholder="Silahkan masukkan Email anda" 
							style={{fontSize: 13, color: '#f0f0f0'}} 
							placeholderTextColor="#969696" 
							keyboardType="email-address"/>
						</Item>


						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Password</Label>
							<Input 
							onChangeText={(password) => this.setState({password})} 
							secureTextEntry={true} 
							style={{fontSize: 13, color: '#f0f0f0'}} 
							placeholder="Silahkan masukan password anda" 
							placeholderTextColor="#969696"/>
						</Item>

						<Item stackedLabel>
							<Label style={{color: '#f0f0f0'}}>Ulangi Password</Label>
							<Input 
							onChangeText={(password) => this.setState({password})} 
							secureTextEntry={true} 
							style={{fontSize: 13, color: '#f0f0f0'}} 
							placeholder="Silahkan ulangi password anda" 
							placeholderTextColor="#969696"/>
						</Item>
					</Form>

					<View style={{paddingHorizontal: 20, paddingTop: 30}}>
						{this.buttonInput()}
						<View style={{paddingTop: 25, flexDirection: 'row' }}>
							<Left>
								<Text style={{color: '#4DB6AC', fontSize: 13}}>Daftar dengan No.HP</Text>
							</Left>

							<Right>
								<Text style={{color: '#4DB6AC', fontSize: 13}} onPress={()=>this.props.navigation.navigate('login')}>Sudah punya akun?</Text>
							</Right>
						</View>
						<View style={{marginTop: 30 ,paddingTop : 40, paddingHorizontal: 20, height: 50}}>
							<View style={{borderBottomWidth: 1, borderBottomColor: '#707070'}}/>
							<Text style={{position: 'absolute', zIndex: 1, top: 28, left: 138, backgroundColor: '#282828', color: '#969696', paddingHorizontal: 8, fontSize: 15 }}>Daftar dengan</Text>
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
					<Text style={{color: '#444'}}>Daftar</Text>
				</Button>
			)
		}else{
			return(
				<Button style={{borderRadius: 25, backgroundColor: '#26A69A'}} block onPress={() => this.handleRegist()}>
					<Text style={{color: '#282828'}}>Daftar</Text>
				</Button>
			)
		}
	}

	async handleRegist(){
		try{
		await this.props.dispatch(register({
			username : this.state.username,
			email : this.state.email,
			password : this.state.password,
			name : this.state.name,
			avatar : this.state.avatar,
			phone : this.state.phone
		}));
		const loginInfo = this.props.auth.data
		if(loginInfo.token){

			await AsyncStorage.setItem('userId', String(loginInfo.userId));
			await AsyncStorage.setItem('token', loginInfo.token);
			await AsyncStorage.setItem('refreshToken', loginInfo.refreshToken);
			
			this.props.navigation.navigate('Home')
		}
		else if(loginInfo.status === 'registered'){
			Alert.alert("Ups", loginInfo.message)
		}
		else if(loginInfo.status === 'error'){
			Alert.alert("Ups", loginInfo.message)
		}
		else{
			Alert.alert("Error", "Terjadi suatu kesalahan, harap coba lagi nanti.")
		}
	}catch(e){
		console.warn(e.response);
	}
	}
	
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Register)