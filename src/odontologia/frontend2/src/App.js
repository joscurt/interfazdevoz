import React, { Component } from 'react';
import annyang from 'annyang'
// import logo from './logo.svg';
import 'antd/dist/antd.css';
// import './App.css';

// import MenuDataProvider from './DataProvider';
// import MenuDisplay from './DataDisplay';
import CustomLayout from './containers/Layout';
import ArticleList from './containers/ArticleListView';
// import Dictaphone from './containers/SpeechRecognition';

class App extends Component {
  constructor() {
    super();
    this.state = { hola: false };
  }
  componentDidMount() {
    if (annyang) {
      // Let's define a command.
      var commands = {
        'Hola': () => this.setState({ hola: true })
      };

      // Add our commands to annyang
      annyang.addCommands(commands);

      // Start listening.
      annyang.start();
    }
  }
  render() {
    return ( this.state.hola ? <div className="App"><DiHola /><CustomLayout><ArticleList />
        </CustomLayout></div> : <div className="App"></div>

    );
  }
}


class DiHola extends Component {
  render() {
    return <div>Hola, prueba de comandos.</div>;
  }
}
export default App;
