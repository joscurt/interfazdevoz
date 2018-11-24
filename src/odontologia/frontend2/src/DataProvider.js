import React from 'react';

class MenuDataProvider extends React.Component{
  state={
    data:[],
    loaded: false,
    placeholder: ' Loading...'
  }
  componentDidMount() {
    fetch(this.props.endpoint)
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder:'Algo mal pasa'})
        }
        console.log(response);
        return response.json()
      })
      .then(data => this.setState({ data: data, loaded: true}))
  }
    render(){
      const {loaded, data, placeholder } = this.state
      return (
        loaded ?
        this.props.render(data) :
        <p>{ placeholder }</p>
      );
    }
}
export default MenuDataProvider;
