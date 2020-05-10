import React, {Component} from 'react';


const Hello = (props) => {

		return(
		<div class='tc'>
		 <h1>Hello World</h1>
		 <p>{props.dog}</p>
		 </div>
	);

}


export default Hello;