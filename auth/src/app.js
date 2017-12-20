import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAUAo2vNQbVHJY3ZkUY3BbvWRWQtzbOO5Y',
      authDomain: 'auth-rn-app.firebaseapp.com',
      databaseURL: 'https://auth-rn-app.firebaseio.com',
      projectId: 'auth-rn-app',
      storageBucket: 'auth-rn-app.appspot.com',
      messagingSenderId: '265789894302'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (<CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        </CardSection>);
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerTitle={'Auth App'} />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
