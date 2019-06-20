import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
    
    //helper method
onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true })
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        //.then handles it if succesful, .catch handles it if not succesfull.
        .then(this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this))
        });
}

//helper method
onLoginFail() {
    this.setState({
        error: 'Authentication Failed', 
        loading: false
    })
}

//helper method
onLoginSuccess() {
    this.setState({ 
        email: '',
        password: '',
        loading: false,
        error: ''
    })

}

//helper method
renderButton () {
    if (this.state.loading) {
        return <Spinner size='small' >/</Spinner>
    } 
    //behaves like if/else
    return (
        <Button onPress={this.onButtonPress.bind(this)}>
          Log In
        </Button>
    );
}

    render () {
        return (
            <Card>
                <CardSection>
                    <Input 
                        label="Email"
                        placeholder="user@myemail.com"
                        value={ this.state.email }
                        onChangeText={ email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry={true}
                        label='Password'
                        placeholder='password'
                        value={ this.state.password }
                        onChangeText={ password => this.setState({ password })}
                    />
                </CardSection>
                {/* below text tag only populates if there is an error */}
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }

}

export default LoginForm;