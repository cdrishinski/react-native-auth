import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm'



class App extends Component {
    state = { loggedIn: null };

    //pulls data from firebase db , componentWillMount does this before render() is run
    componentWillMount() {
        firebase.initializeApp({
                apiKey: "AIzaSyBqSdNHQq7W9yVGjjdg6reNVAFQT0WgL4Y",
                authDomain: "authentication-f323f.firebaseapp.com",
                databaseURL: "https://authentication-f323f.firebaseio.com",
                projectId: "authentication-f323f",
                storageBucket: "authentication-f323f.appspot.com",
                messagingSenderId: "623457039838",
                appId: "1:623457039838:web:46e3174c4b0d0ae9"
        });

    firebase.auth().onAuthStateChanged((user) => {
        if (user){
            this.setState({ loggedIn: true})
        } else {
            this.setState({ loggedIn: false })
        }
    });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Button 
                        onPress={() => firebase.auth().signOut()}>
                            Log Out
                    </Button>
                )
            case false:
                return <LoginForm />
            default:
                return <Spinner size='large' />
           }

    }

    render() {
        return(
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
        };
};

export default App;