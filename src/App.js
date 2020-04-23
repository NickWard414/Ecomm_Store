import React, { Component } from 'react';
import HomePage from './components/pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './components/pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './components/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

    unsubscribeFromAuth = null;

    componentDidMount(){
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              }
            })

            console.log(this.state)
          });
        }else {
          this.setState({ currentUser: userAuth})
        }
      })
    }

    componentWillUnmount(){
      this.unsubscribeFromAuth();
    }
    
  render() {
    return (
      <div>
        <Header currentUser = {this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route  path='/shop' component={ShopPage} />
          <Route  path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
