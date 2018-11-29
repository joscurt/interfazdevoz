import React, { Component } from 'react';
// import annyang from 'annyang'
import Artyom from 'artyom.js';
// import logo from './logo.svg';
import 'antd/dist/antd.css';
import ArtyomCommandsManager from './components//ArtyomCommands.js';
// import {rNumbers} from './components//ArtyomCommands.js';
// import './App.css';

// import MenuDataProvider from './DataProvider';
// import MenuDisplay from './DataDisplay';
// import CustomLayout from './containers/Layout';
// import ArticleList from './containers/ArticleListView';
// import Dictaphone from './containers/SpeechRecognition';

const Jarvis = new Artyom();

class App extends Component {
  constructor (props, context){
          super(props, context);
          this.textInput = React.createRef();
          // Add `this` context to the handler functions
          this.startAssistant = this.startAssistant.bind(this);
          this.stopAssistant = this.stopAssistant.bind(this);
          this.speakText = this.speakText.bind(this);
          this.handleTextareaChange = this.handleTextareaChange.bind(this);
          this.textRender = this.textRender.bind(this);
          this.getData = this.getData.bind(this);

          // this.redirectRecognizedTextOutput = this.redirectRecognizedTextOutput.bind(this);

          // Prepare simple state
          this.state = {
              artyomActive: false,
              textareaValue: "",
              artyomIsReading: false,
              textValue: ""
          };

          // Load some commands to Artyom using the commands manager
          let CommandsManager = new ArtyomCommandsManager(Jarvis);
          CommandsManager.loadCommands();

          console.log(CommandsManager.loadCommands());

      }


      startAssistant() {
            let _this = this;

            console.log("Artyom succesfully started !");

            // var commands = Jarvis.getAvailableCommands();
            //
            // for(var i = 0;i < commands.length;i++){
            //     var command = commands[i];
            //     console.log(command);
            //     // console.log(command.indexOf());
            //   }

            Jarvis.initialize({
                lang: "es-ES",
                debug: true,
                continuous: true,
                soundex: true,
                listen: true
            }).then(() => {
                // Display loaded commands in the console
                console.log(Jarvis.getAvailableCommands());
                console.log(Jarvis.getProperties());
                // Jarvis.say("Hola, Como estas?");

                // var commands = Jarvis.getAvailableCommands();
                // // console.log(commands);
                //
                // for(var i = 0;i < commands.length;i++){
                //     var command = commands[i];
                //     console.log(command);
                //     // console.log(command.indexOf());
                //   }

                _this.setState({
                    artyomActive: true
                });
            }).catch((err) => {
                console.error("Oopsy daisy, this shouldn't happen !", err);
            });
        }

        stopAssistant() {
            let _this = this;

            Jarvis.fatality().then(() => {
                console.log("Jarvis has been succesfully stopped");

                _this.setState({
                    artyomActive: false
                });

            }).catch((err) => {
                console.error("Oopsy daisy, this shouldn't happen neither!", err);

                _this.setState({
                    artyomActive: false
                });
            });
        }

        speakText() {
            let _this = this;

            _this.setState({
                artyomIsReading: true
            });

            // Speak text with Artyom
            Jarvis.say( _this.state.textareaValue, {
                onEnd() {
                    _this.setState({
                        artyomIsReading: false
                    });
                }
            });
        }

        handleTextareaChange(event) {
            this.setState({
                textareaValue: event.target.value
            });
        }
        componentDidMount(){
          this.textRender();
          this.textInput.current.focus();
        }
        getData(val){
            // do not forget to bind getData in constructor
            console.log(val);
        }
        textRender(text) {
          Jarvis.redirectRecognizedTextOutput((text,isFinal) => {
        			if (isFinal) {
        			}else{
                  this.setState({
                      textValue: text
                });
        			}
        		});
          }

        render() {
          console.log(this.props);
            return (
                <div>
                    <h1>Welcome to Jarvis Assistant</h1>
                   <input id="salida" ref={this.textInput} style={{width: 400 + 'px'}} value={this.state.textValue}/>
                    <p>In this very basic assistant, you can say hello and ask for some reports e.g `Generate report of April of this year`</p>

                    {/* Voice commands action buttons */}
                    <input type="button" value="Start Artyom" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
                    <input type="button" value="Stop Artyom" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>

                    {/* Speech synthesis Area */}

                    <p>I can read some text for you if you want:</p>

                    <textarea rows="5" onChange={this.handleTextareaChange} value={this.state.textareaValue}/>
                    <br/>
                    {/* Read the text inside the textarea with artyom */}
                    <input type="button" value="Read Text" disabled={this.state.artyomIsReading} onClick={this.speakText}/>
                </div>
            )
        }

}

export default App;
