import React, { Component } from 'react';
// import annyang from 'annyang'
import Artyom from 'artyom.js';
// import logo from './logo.svg';
import 'antd/dist/antd.css';
// import ArtyomCommandsManager from './components//ArtyomCommands.js';
// import {rNumbers} from './components//ArtyomCommands.js';
// import './App.css';

// import MenuDataProvider from './DataProvider';
// import MenuDisplay from './DataDisplay';
import CustomLayout from './containers/Layout';
import ArticleList from './containers/ArticleListView';
import CustomForm from './components/Form';
import CustomForm12 from './components/diente12';
import CustomForm13 from './components/diente13';
import CustomForm14 from './components/diente14';
import CustomForm15 from './components/diente15';
import CustomForm16 from './components/diente16';
import CustomForm17 from './components/diente17';
import CustomForm18 from './components/diente18';
import CustomForm21 from './components/diente21';
import CustomForm22 from './components/diente22';
import CustomForm23 from './components/diente23';
import CustomForm24 from './components/diente24';
import CustomForm25 from './components/diente25';
import CustomForm26 from './components/diente12';
import CustomForm27 from './components/diente12';
import CustomForm28 from './components/diente12';
import CustomForm31 from './components/diente12';
import CustomForm32 from './components/diente12';
import CustomForm33 from './components/diente12';
import CustomForm34 from './components/diente12';
import CustomForm35 from './components/diente12';
import CustomForm36 from './components/diente12';
import CustomForm37 from './components/diente12';
import CustomForm38 from './components/diente12';
import CustomForm41 from './components/diente12';
import CustomForm42 from './components/diente12';
import CustomForm43 from './components/diente12';
import CustomForm44 from './components/diente12';
import CustomForm45 from './components/diente12';
import CustomForm46 from './components/diente12';
import CustomForm47 from './components/diente12';
import CustomForm48 from './components/diente12';

// import Dictaphone from './containers/SpeechRecognition';

const Jarvis = new Artyom();

class App extends Component {
  constructor (props, context){
          super(props, context);

          // this._artyom = ArtyomInstance;

          this.textInput = React.createRef();
          // Add `this` context to the handler functions
          this.startAssistant = this.startAssistant.bind(this);
          this.stopAssistant = this.stopAssistant.bind(this);
          this.speakText = this.speakText.bind(this);
          this.handleTextareaChange = this.handleTextareaChange.bind(this);
          this.textRender = this.textRender.bind(this);
          this.loadCommands = this.loadCommands.bind(this);
          // this.redirectRecognizedTextOutput = this.redirectRecognizedTextOutput.bind(this);

          // Prepare simple state
          this.state = {
              artyomActive: false,
              textareaValue: "",
              artyomIsReading: false,
              textValue: "",
              numValueP1: ""
          };

      }

  loadCommands(){
          return Jarvis.addCommands([
                {
                  indexes: ["Seleccionar Pieza * por vestibular","selecciona pieza * por vestibular","seleccionar pisa * por vestibular","seleccionar pieza * por betula","seleccionar pieza * por 21","selecciona pisa * por vestibular"],
                  smart: true,
                  action: (i, num) => {

                    let rNumbers = {
                      num: num
                    }

                    var num2 = Number(num*10);
                    console.log(num2);
                    if (typeof num2 !== 'undefined' && num2 !== null && Number.isInteger(num2)){

                      this.setState({
                          numValueP1: num*10
                        });

                      Jarvis.say(`Estas en la pieza Dental numero ${num}`);
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
                  // console.log(rNumbers);
                  //   if(num == 1.1){
                  //     Jarvis.say(`Estas en la pieza Dental numero ${num}`);
                  //     let _this = this;
                  //
                  //     Jarvis.fatality().then(() => {
                  //         console.log("Jarvis has been succesfully stopped");
                  //         _this.setState({
                  //             artyomActive: false
                  //         });
                  //     }).catch((err) => {
                  //         console.error("Oopsy daisy, this shouldn't happen neither!", err);
                  //         _this.setState({
                  //             artyomActive: false
                  //         });
                  //     });

                        // {
                        //   indexes: ["vestibular", "vestibular"],
                        //   action: () => {
                        //       Jarvis.say("Estas por Vestibular");
                        //       this.textInput.current.focus();
                        //   }
                        // }

                    // }
                    else{
                      Jarvis.say(`Pieza Incorrecta`);
                    }
                  }
                },
          ]);
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
          this.loadCommands();
          this.startAssistant();
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
           // var CustomForm = "CustomForm";
           // var diente = `CustomForm${this.state.numValueP1}`;
           // var name = 0;
           // var name = 'CustomForm' + this.state.numValueP1;
           // var ChildComponent = eval(name);  // or eval(name)
           // var Components = {
           //    CustomForm: `CustomForm${this.state.numValueP1}`,
           //    };
           // var ComponentName  = "CustomForm";
           // var ChildComponent = Components[ComponentName];

          // var type = "12";
          // var MyComponent = CustomForm["12"];


          // console.log(ChildComponent);
          if (this.state.numValueP1 == 11) {
            return(
              <div className="App">
                <CustomLayout>
                <CustomForm
                  requestType="post"
                  btnText="Crear"
                  />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 12) {
            // const ChildComponent = "CustomForm" + this.state.numValueP1;
            // const ChildComponent2 = ChildComponent.replace(/['"]+/g, '');
            // console.log(ChildComponent2);
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm12 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 13) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm13 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 14) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm14 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 15) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm15 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 16) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm16 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 17) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm17 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 18) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm18 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 21) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm21 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 22) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm22 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 23) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm23 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 24) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm13 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 25) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm25 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 26) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm26 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 27) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm27 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 28) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm28 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 31) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm31 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 32) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm32 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 33) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm33 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 34) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm34 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 35) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm35 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 36) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm36 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 37) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm37 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 38) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm38 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 41) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm41 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 42) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm42 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 43) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm43 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 44) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm44 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 45) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm45 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 46) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm46 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 47) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm47 />
                </CustomLayout>
              </div>
            );
          }
          if (this.state.numValueP1 == 48) {
            return(
              <div className="App">
                <CustomLayout>
                  <CustomForm48 />
                </CustomLayout>
              </div>
            );
          }
          else {
            return(
              <div>
              <CustomLayout>
                      <h1>Asistente</h1>
                     <input id="salida" ref={this.textInput} style={{width: 400 + 'px'}} value={this.state.textValue}/>
                     <input type="hidden" value={this.state.numValueP1} />
                      {/* Voice commands action buttons */}
                      <input type="button" value="Iniciar Asistente" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
                      <input type="button" value="Detener Asistente" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>

                      {/* Speech synthesis Area */}

                      {/*<p>Probar lectura de un texarea:</p>*/}

                      {/*<textarea rows="5" onChange={this.handleTextareaChange} value={this.state.textareaValue}/>
                      <br/>*/}
                      {/* Read the text inside the textarea with artyom */}
                      <input type="button" value="Read Text" disabled={this.state.artyomIsReading} onClick={this.speakText}/>
                  </CustomLayout>
                  </div>
            );
          }
        }
}

export default App;
