import React, { Component } from 'react'
import ReactSearchBox from 'react-search-box'



export default class SearchBar extends Component {

  
  constructor(props){
    super(props);
    console.log(this.props.location);
    this.onSearchChange=this.onSearchChange.bind(this);
    this.state={
      location1:props.location
    }
    console.log("location1"+this.state.location1)
  }

  componentDidMount(){

  }

  onSearchChange(event){
    this.setState({location1: event},()=> {
    //console.log("location1"+this.state.location1)
    this.props.onLocationDataChanged(this.state.location1)
    })
  }
  

  data = [
    {
      key: 'hyderabad',
      value: 'Hyderabad',
    },
    {
      key: 'bangalore',
      value: 'Bangalore',
    },
    {
      key: 'indore',
      value: 'Indore',
    },
    {
      key: 'kolkata',
      value: 'Kolkata',
    },
    {
      key: 'new york',
      value: 'New York',
    },
  ]





render() {
    return (
      <ReactSearchBox
        placeholder="Where?"
        value="Doe"
        data={this.data}
        callback={record => console.log(record)}
        onChange={this.onSearchChange}
        
      />
    )
  }
} 