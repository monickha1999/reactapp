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
		 const{robots, searchfield} = this.state;
		   const filteredRobots =robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
				})

   return !robots.length?
   	<h1> Loading </h1>  }
   (		<div className='tc'>
		<h1 className='f1'>RobotFriends</h1>
		<SearchBox searchChange={this.onSearchChange}/>
		<Scroll>
		<CardList robots={filteredRobots} />
	</Scroll>
		</div>
		);
	
}
}
export default app;