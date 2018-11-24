import React, { PropTypes, Component } from 'react'
import axios from 'axios';
import SpeechRecognition from 'react-speech-recognition'

import { Form, Input, Button } from 'antd';

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  // recognition: PropTypes.object,
  browserSupportsSpeechRecognition: PropTypes.bool
}

const FormItem = Form.Item;

class CustomForm extends Component {

  handleFormSubmit = (event, requestType) => {

    event.preventDefault();
    const nombre = event.target.elements.nombre.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    switch( requestType ) {
      case 'post':
          axios.post('http://127.0.0.1:8080/api/profile/', {
            nombre: nombre,
            email: email,
            password: password,
          })
          .then(res => console.log(res))
          .catch(error =>console.log(error));
    }

    console.log(nombre,email, password)
  }

  render() {
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <div>
      <Form onSubmit={(event) => this.handleFormSubmit(
          event,
          this.props.requestType)}>
          <FormItem label="Nombre">
            <Input name="nombre" placeholder="Nombre" value={transcript}/>
          </FormItem>
          <FormItem label="Email">
            <Input name="email" placeholder="Tu Email" />
          </FormItem>
          <FormItem label="pasword">
            <Input type="password" name="password" placeholder="Tu Pass" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit">Crear</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

CustomForm.propTypes = propTypes

export default SpeechRecognition(CustomForm);
