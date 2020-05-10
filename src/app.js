import React, {Component} from 'react';
import './hi.css';

import SearchBox from './SearchBox.js';
import CardList from './CardList.js';
import {robots} from './robots.js';
import Scroll from './Scroll';

class app extends Component {
	constructor(){
		super()
		this.state = {
			robots: [],
			searchfield: ''

		}
		console.log('1');
	}
		componentDidMount(){
			fetch('https://jsonplaceholder.typicode.com/users')
			.then(response=> response.json())
		
			.then(users=>this.setState({robots: users}));
		
		}
		
	
	OnSearchChange =  (event) => {
		this.setState({searchfield: event.target.value})
	
	}
	render(){
		const filteredRobots =this.state.robots.filter(robots =>{
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
				})

   if(this.state.robots.length === 0){
   	return <h1> Loading </h1>  }
   	else{
	return(
		<div className="tc bg-light-blue bg-animate hover-bg-pink gradient-name=dark-blue">
		<h1 className='f1'>RobotFriends</h1>
		<SearchBox searchChange={this.OnSearchChange}/>
		<Scroll>
		<CardList robots={filteredRobots} />
	</Scroll>
		</div>
		);
	}
}
}
export default app;