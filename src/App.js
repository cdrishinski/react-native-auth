import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';



class App extends Component {
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
        })
    }

    render() {
        return(
            <View>
                <Header headerText="Authentication" />
                <Text>An App!</Text>
            </View>
        );
        };
};

export default App;