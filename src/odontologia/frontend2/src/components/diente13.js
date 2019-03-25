import React, { PropTypes, Component } from 'react'
import axios from 'axios';
import Artyom from 'artyom.js';
import App from '../App';
// import SpeechRecognition from 'react-speech-recognition'

import { Form, Input, Button, Radio, Row, Col, Switch, Icon } from 'antd';

// const propTypes = {
  // Props injected by SpeechRecognition
  // transcript: PropTypes.string,
  // resetTranscript: PropTypes.func,
  // recognition: PropTypes.object,
  // browserSupportsSpeechRecognition: PropTypes.bool
// }

const FormItem = Form.Item;
const Jarvis = new Artyom();

class CustomForm13 extends Component {

  constructor (props, context){
          super(props, context);

          // this._artyom = ArtyomInstance;

          this.textInputm1 = React.createRef();
          this.textInputm2 = React.createRef();
          this.textInputm3 = React.createRef();
          // Add `this` context to the handler functions
          this.textRender1 = this.textRender1.bind(this);
          this.textRender2 = this.textRender2.bind(this);
          this.textRender3 = this.textRender3.bind(this);
          this.loadCommands2 = this.loadCommands2.bind(this);
          this.startAssistant = this.startAssistant.bind(this);
          this.sangPrompt = this.sangPrompt.bind(this);
          this.margenPrompt = this.margenPrompt.bind(this);
          this.profPrompt = this.profPrompt.bind(this);
          this.tipoMedicion = this.tipoMedicion.bind(this);

          // this.redirectRecognizedTextOutput = this.redirectRecognizedTextOutput.bind(this);

          // Prepare simple state
          this.state = {
              textValue1: "",
              textValue2: "",
              textValue3: "",
              numValueP1: "",
              numValueP2: "",
              numValueP3: "",
              sangValue: "",
              prof: "",
              formLayout: 'horizontal',
                artyomActive: false,
          };


          // Load some commands to Artyom using the commands manager
          // let CommandsManager = new ArtyomCommandsManager(Jarvis);
          // loadCommands();
          // RenderCommands();
          // console.log(CommandsManager.loadCommands());

      }
      handleChange(event) {
        this.setState({numValueP4: event.target.value})
      }
      handleFormLayoutChange = (e) => {
        this.setState({ formLayout: e.target.value });
      }
      startAssistant() {
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
                speed: 1,
                obeyKeyword: "continuar",
                debug: true,
                continuous: true,
                soundex: true,
                listen: true
            }).then(() => {
                // Display loaded commands in the console
                console.log(Jarvis.getAvailableCommands());});
          }



          tipoMedicion(){
             Jarvis.newPrompt({
                 question: "Qué desea medir?",
                 options:["profundidad de sondaje","margen gingival", "sangrado","un día de sondaje","pues un día es sondaje"],
                 onMatch: (i) => {
                    let action;

                    if(i == 0 || i == 3 || i == 4){
                        action = () => {
                             this.profPrompt();
                        }
                    }
                    if(i == 1){
                        action = () => {
                             this.margenPrompt();
                        }
                    }
                    if(i == 2){
                        action = () => {
                             this.sangPrompt();
                        }
                    }
                     return action;
                 }
             });
         }
         sangPrompt(){
           this.setState({
               prof: 3
             });
            Jarvis.newPrompt({
                question: "Estas en el sangrado",
                smart: true,
                options:["sangrado *", "medir profundidad *", "medir margen *","finalizar *"],
                // i returns the index of the given options
                onMatch: (i, val1) => {
                    let action;

                    var val2 = String(val1);
                    console.log(val2);
                    // Paste
                    if(i == 0){
                        action = () => {

                          console.log(val1);
                          if(val1 == "positivo"){

                            this.setState({
                                sangValue: val1
                              });

                            Jarvis.say(`La piesa dental tiene sangrado ${val1}`,{
                              onStart() {
                                  console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            let _this = this;
                            // this.profPrompt();
                            this.sangPrompt();
                          }else{
                            Jarvis.say(`Valor incorrecto`,{
                              onStart() {
                                  console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            this.sangPrompt();
                          }
                        }
                    }
                    if(i == 1){
                      this.profPrompt();
                    }

                    if(i == 2){
                      this.margenPrompt();
                    }
                    if(i == 3){
                        this.setState({
                                finalizar: val1
                              });
                              if (typeof val1 !== 'undefined' && val1 !== null && val1 == "medición"){

                              Jarvis.say(`La medición de la pieza dental ha sido finalisada`);
                              Jarvis.fatality().then(() => {
                                  console.log("Jarvis has been succesfully stopped");
                              }).catch((err) => {
                                  console.error("Oopsy daisy, this shouldn't happen neither!", err);
                              });
                              }else{
                                Jarvis.say(`Valor incorrecto, deseas finalizar?`);
                              }
                        }
                    // A function needs to be returned in onMatch event
                    // in order to accomplish what you want to execute
                    return action;
                }
            });
        }
          profPrompt(){
            this.setState({
                prof: 1
              });

             Jarvis.newPrompt({
                 question: "Estas midiendo la profundidad del sondaje",
                 smart: true,
                 options:["Distal *","Messi al *","medial *", "medir margen *","medir sangrado *","finalizar *"],
                 // i returns the index of the given options
                 onMatch: (i, num) => {
                     let action;

                     // Paste
                     if(i == 0){
                         action = () => {

                           var num2 = Number(num);
                           console.log(num2);
                           if(Number.isInteger(num2)){
                             this.setState({
                                 numValueP1: num
                               });
                             Jarvis.say(`La profundidad es ${num} Milímetros`,{
                               onStart() {
                                   console.log("Comienzo del texto.");
                               },
                               onEnd() {
                                   Jarvis.ArtyomWebkitSpeechRecognition.abort();
                               }
                             });
                             let _this = this;
                             this.profPrompt();

                           }else{
                             Jarvis.say(`Valor incorrecto`,{
                               onStart() {
                                   console.log("Comienzo del texto.");
                               },
                               onEnd() {
                                   Jarvis.ArtyomWebkitSpeechRecognition.abort();
                               }
                             });
                             this.profPrompt();
                           }
                         }
                     }

                     // Say
                     if(i == 1){
                         action = () => {

                         var num2 = Number(num);

                           if(Number.isInteger(num2)){
                             this.setState({
                                 numValueP3: num
                               });
                             Jarvis.say(`La profundidad es ${num2} Milímetros`,{
                               onStart() {
                                   console.log("Comienzo del texto.");
                               },
                               onEnd() {
                                   Jarvis.ArtyomWebkitSpeechRecognition.abort();
                               }
                             });
                             let _this = this;
                             this.profPrompt();

                           }else{
                             Jarvis.say(`Valor incorrecto`,{
                               onStart() {
                                   console.log("Comienzo del texto.");
                               },
                               onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                               }
                             });
                             this.profPrompt();
                           }
                         }
                     }
                     if(i == 2){

                       let rNumbers = {
                         num: num
                       }
                       var num2 = Number(num);

                       console.log(rNumbers);
                       if(Number.isInteger(num2)){
                         this.setState({
                             numValueP2: num
                           });
                         Jarvis.say(`La profundidad es ${num2} Milímetros`,{
                           onStart() {
                               console.log("Comienzo del texto.");
                           },
                           onEnd() {
                               Jarvis.ArtyomWebkitSpeechRecognition.abort();
                           }
                         });
                         let _this = this;
                         this.profPrompt();

                       }else{
                         Jarvis.say(`Valor incorrecto`,{
                           onStart() {
                               console.log("Comienzo del texto.");
                           },
                           onEnd() {
                               Jarvis.ArtyomWebkitSpeechRecognition.abort();
                           }
                         });
                         this.profPrompt();
                       }
                     }
                     if(i == 3){
                       this.margenPrompt();
                     }
                     if(i == 4){
                       this.sangPrompt();
                     }
                     if(i == 5){
                         this.setState({
                                 finalizar: num
                               });
                               if (typeof num !== 'undefined' && num !== null && num == "medición"){

                               Jarvis.say(`La medición de la pieza dental ha sido finalisada`);
                               Jarvis.fatality().then(() => {
                                   console.log("Jarvis has been succesfully stopped");
                               }).catch((err) => {
                                   console.error("Oopsy daisy, this shouldn't happen neither!", err);
                               });
                               }else{
                                 Jarvis.say(`Valor incorrecto, deseas finalizar?`);
                               }
                      }

                     // A function needs to be returned in onMatch event
                     // in order to accomplish what you want to execute
                     return action;
                 }
             });
         }
         margenPrompt(){
           this.setState({
               prof: 2
             });
            Jarvis.newPrompt({
                question: "Estas midiendo El margen gingival",
                smart: true,
                options:["Distal *","Messi al *","medial *", "medir profundidad *","medir sangrado *","finalizar *"],
                // i returns the index of the given options
                onMatch: (i, num) => {
                    let action;

                    // Paste
                    if(i == 0){
                        action = () => {

                          let rNumbers = {
                            num: num
                          }
                          var num2 = Number(num);
                          console.log(num2);
                          if(Number.isInteger(num2)){
                            this.setState({
                                numValueP6: num
                              });
                            Jarvis.say(`El margen es ${num} Milímetros`,{
                              onStart() {
                                  console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            let _this = this;
                            this.margenPrompt();

                          }else{
                            Jarvis.say(`Valor incorrecto`,{
                              onStart() {
                                  console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            this.margenPrompt();
                          }
                        }
                    }

                    // Say
                    if(i == 1){
                        action = () => {

                          let rNumbers = {
                            num: num
                          }
                        console.log(rNumbers);
                        var num2 = Number(num);

                          if(Number.isInteger(num2)){
                            this.setState({
                                numValueP4: num
                              });
                            Jarvis.say(`El margen es ${num2} Milímetros`,{
                              onStart() {
                                console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            let _this = this;
                            this.margenPrompt();

                          }else{
                            Jarvis.say(`Valor incorrecto`,{
                              onStart() {
                                  console.log("Comienzo del texto.");
                              },
                              onEnd() {
                                  Jarvis.ArtyomWebkitSpeechRecognition.abort();
                              }
                            });
                            this.margenPrompt();
                          }
                        }
                    }
                    if(i == 2){

                      let rNumbers = {
                        num: num
                      }
                      var num2 = Number(num);

                      console.log(rNumbers);
                      if(Number.isInteger(num2)){
                        this.setState({
                            numValueP5: num
                          });
                        Jarvis.say(`El margen es ${num2} Milímetros`,{
                          onStart() {
                            console.log("Comienzo del texto.");
                          },
                          onEnd() {
                              Jarvis.ArtyomWebkitSpeechRecognition.abort();
                          }
                        });
                        let _this = this;
                        this.margenPrompt();

                      }else{
                        Jarvis.say(`Valor incorrecto`,{
                          onStart() {
                              console.log("Comienzo del texto.");
                          },
                          onEnd() {
                              Jarvis.ArtyomWebkitSpeechRecognition.abort();
                          }
                        });
                        this.margenPrompt();
                      }
                    }
                    if(i == 3){
                      this.profPrompt();
                    }
                    if(i == 4){
                      this.sangPrompt();
                    }
                    if(i == 5){
                        this.setState({
                                finalizar: num
                              });
                              if (typeof num !== 'undefined' && num !== null && num == "medición"){

                              Jarvis.say(`La medición de la pieza dental ha sido finalisada`);
                              Jarvis.fatality().then(() => {
                                  console.log("Jarvis has been succesfully stopped");
                              }).catch((err) => {
                                  console.error("Oopsy daisy, this shouldn't happen neither!", err);
                              });
                              }else{
                                Jarvis.say(`Valor incorrecto, deseas finalizar?`);
                              }
                            }
                    return action;
                }
            });
        }
      loadCommands2(){
              // let Jarvis = this._artyom;
              // Here you can load all the commands that you want to Artyom
              return Jarvis.addCommands([
                  // {
                  //     indexes: ["Mesial", "Messi al", "mi cielo"],
                  //     // smart:true,
                  //     action: (index,wildcard) => {
                  //         Jarvis.say("Selección correcta",
                  //         {
                  //           onStart:function(){
                  //                   console.log("The text has been started.");
                  //               },
                  //           onEnd:function(){
                  //                         // Abort the speech recognition when artyom stops talking !
                  //                         // Then, the command won't be triggered when artyom says hello !
                  //                         Jarvis.ArtyomWebkitSpeechRecognition.abort();
                  //                     }
                  //                 });
                  //         this.textInputm1.current.focus();
                  //         this.textRender1()
                  //     }
                  // },

                  //Comando para medir por Distal

                  // {
                  //   indexes: ["Distal *", "vital *"],
                  //   smart: true,
                  //   action: (i, num) => {
                  //     this.setState({
                  //         numValueP1: num
                  //       });
                  //     let rNumbers = {
                  //       num: num
                  //     }
                  //     var num2 = Number(num);
                  //     console.log(num2);
                  //     if(Number.isInteger(num2)){
                  //       Jarvis.say(`La profundidad por Distal es ${num} Milímetros`);
                  //       let _this = this;
                  //
                  //     }else{
                  //       Jarvis.say(`Valor incorrecto`);
                  //     }
                  //   }
                  // },
                  // {
                  //   indexes: ["Mesial *", "Messi al *", "mi cielo *"],
                  //   smart: true,
                  //   action: (i, num) => {
                  //     this.setState({
                  //         numValueP3: num
                  //       });
                  //     let rNumbers = {
                  //       num: num
                  //     }
                  //   console.log(rNumbers);
                  //   var num2 = Number(num);
                  //
                  //     if(Number.isInteger(num2)){
                  //       Jarvis.say(`La profundidad por Mesial es ${num2} Milímetros`);
                  //       let _this = this;
                  //
                  //     }else{
                  //       Jarvis.say(`Valor incorrecto`);
                  //     }
                  //   }
                  // },
                  // {
                  //   indexes: ["Medial *"],
                  //   smart: true,
                  //   action: (i, num) => {
                  //     this.setState({
                  //         numValueP2: num
                  //       });
                  //     let rNumbers = {
                  //       num: num
                  //     }
                  //     var num2 = Number(num);
                  //
                  //     console.log(rNumbers);
                  //     if(Number.isInteger(num2)){
                  //       Jarvis.say(`La profundidad por Medial es ${num2} Milímetros`);
                  //       let _this = this;
                  //
                  //     }else{
                  //       Jarvis.say(`Valor incorrecto`);
                  //     }
                  //   }
                  // },
                  {
                  indexes:["Detener"],
                  action:function(i){
                      Jarvis.dontObey();
                      console.log("Artyom isn't obeying anymore");
                    }
                  },
                  {
                  indexes:["finalizar *"],
                  smart: true,
                  action: (i, num) => {
                    this.setState({
                            finalizar: num
                          });
                          if (typeof num !== 'undefined' && num !== null && num == "medición"){

                          Jarvis.say(`La medición de la pieza dental ha sido finalisada`);
                          Jarvis.fatality().then(() => {
                              console.log("Jarvis has been succesfully stopped");
                          }).catch((err) => {
                              console.error("Oopsy daisy, this shouldn't happen neither!", err);
                          });
                          }
                          else{
                            Jarvis.say(`Valor incorrecto, deseas finalizar?`);
                          }
                        }
                  },
                  {
                  indexes:["iniciar medición"],
                  action: () => {
                      this.tipoMedicion();
                    }
                  },
                  // {
                  //     indexes: ["Medial", "vestibular"],
                  //     action: () => {
                  //         Jarvis.say("Selección correcta");
                  //         this.textInputm2.current.focus(
                  //
                  //         );
                  //         this.textRender2()
                  //     }
                  // },
                  // {
                  //     indexes: ["Distal", "vestibular"],
                  //     action: () => {
                  //         Jarvis.say("Selección correcta");
                  //         this.textInputm3.current.focus(
                  //
                  //         );
                  //         this.textRender3()
                  //     }
                  // },
                  ]);
                }
      componentDidMount(){
        this.loadCommands2();
        this.startAssistant();
      }
      // shouldComponentUpdate(nextProps, nextState){
      //   console.log('componentWillReceiveProps', nextProps, nextState);
      //   // if (this.state.numValueP4 !== nextState.numValueP4) {
      //   //   console.log('Probando');
      //   //   return true;
      //   // }
      //   // this.state.numValueP4;
      //   // this.state.numValueP5;
      //   // this.state.numValueP6;
      // }
      textRender1(text) {
        Jarvis.redirectRecognizedTextOutput((text,isFinal) => {
            if (isFinal) {
            }else{
                this.setState({
                    textValue1: text
              });
            }
          });

        }

        textRender2(text) {
          Jarvis.redirectRecognizedTextOutput((text,isFinal) => {
              if (isFinal) {
              }else{
                  this.setState({
                      textValue2: text
                });
                Jarvis.dontObey();
              }
            });
          }

          textRender3(text) {
            Jarvis.redirectRecognizedTextOutput((text,isFinal) => {
                if (isFinal) {
                }else{
                    this.setState({
                        textValue3: text
                  });
                }
              });
            }
      // handleFormSubmit = (event, requestType) => {

    //     event.preventDefault();
    //     const nombre = event.target.elements.nombre.value;
    //     const email = event.target.elements.email.value;
    //     const password = event.target.elements.password.value;
    //
    //     switch( requestType ) {
    //       case 'post':
    //         axios.post('http://127.0.0.1:8080/api/profile/', {
    //         nombre: nombre,
    //         email: email,
    //         password: password,
    //       })
    //       .then(res => console.log(res))
    //       .catch(error =>console.log(error));
    // }
    // console.log(nombre,email, password)
  // }

  render() {
    const { formLayout } = this.state;
    const prof = this.state.prof;
    const sang = this.state.sangValue;
    var divStyle = {
      boxShadow: '0 0 5px rgba(81, 203, 238, 1)',
      padding: '8px 18px 7px 28px',
      // margin: '5px 1px 3px 0px',
      border: '1px solid rgba(81, 203, 238, 1)',
        color: '#40A9FF',
        WebkitTransition: 'all', // note the capital 'W' here
        msTransition: 'all' // 'ms' is the only lowercase vendor prefix
      };
      var divStyle2 = {
          color: 'black',
          padding: '8px 18px 7px 28px',
          WebkitTransition: 'all', // note the capital 'W' here
          msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };
        var divStyle3= {
            color: 'white',
          };
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    // const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props
    //
    // if (!browserSupportsSpeechRecognition) {
    //   return null
    // }
if(this.state.finalizar == "medición"){
  return(
    <App />
  );
}else{
    return (
      <div>
      <Form>
    {  /*onSubmit={(event) => this.handleFormSubmit(event)*/ }

        <div className="gutter-example">
        <h1>Pieza dental 1.3 por vestibular</h1>
        <img src={require('../images/periodontograma-dientes-arriba-13.png')} />
        <Row gutter={32}>
          <Col className="gutter-row" span={6}>
          <div className="gutter-box">
            <h2 style={divStyle3}>-</h2>
          </div>
            <div className="gutter-box">
              <h2>Mesial:</h2>
            </div>
            <div className="gutter-box">
              <h2>Medial :</h2>
            </div>
            <div className="gutter-box">
              <h2>Distal :</h2>
            </div>
          </Col>
          <Col style={(prof == 1) ? divStyle : divStyle2} className="gutter-row" span={6}>
            <div className="gutter-box">
              <h2 >Profundidad de sondaje</h2>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="mesialprof" value={this.state.numValueP3} placeholder=""/>
              </FormItem>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="medialprof" value={this.state.numValueP2} placeholder=""/>
              </FormItem>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="distalprof" value={this.state.numValueP1} placeholder=""/>
              </FormItem>
            </div>
          </Col>
          <Col style={(prof == 2) ? divStyle : divStyle2} className="gutter-row" span={6}>
            <div className="gutter-box">
              <h2>Margen Gingival</h2>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="mesialmar"  value={this.state.numValueP4} onChange={this.handleChange.bind(this)} placeholder=""/>
              </FormItem>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="medialmar" value={this.state.numValueP5} onChange={this.handleChange.bind(this)} placeholder=""/>
              </FormItem>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="distalmar" value={this.state.numValueP6} onChange={this.handleChange.bind(this)} placeholder=""/>
              </FormItem>
            </div>
          </Col>
          <Col style={(prof == 3) ? divStyle : divStyle2} className="gutter-row" span={6}>
            <div className="gutter-box">
              <h2>Sangrado</h2>
            </div>
            <div className="gutter-box">
              <FormItem>
                <Input name="distalsan" value={this.state.sangValue} onChange={this.handleChange.bind(this)} placeholder=""/>
              </FormItem>
              {(sang == 'positivo') ?
              (<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked />
              ) : (
              <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} />
              )}
            </div>
          </Col>

        </Row>

      </div>
      <FormItem>
        <Button type="primary" htmlType="submit">Crear</Button>
      </FormItem>
      <input type="hidden" value="Iniciar Asistente" disabled={this.state.artyomActive} onClick={this.startAssistant}/>
      <input type="hidden" value="Detener Asistente" disabled={!this.state.artyomActive} onClick={this.stopAssistant}/>
    </Form>
    </div>
    );
    }
  }
}

// CustomForm.propTypes = propTypes
// export default SpeechRecognition(CustomForm);
export default CustomForm13;
