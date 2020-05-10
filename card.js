import React from 'react';
import './hi.css';
const card = ({name, email, id}) => {
	return(

		<div className='bg-light-green dib br3 pa3 ma2 grow'>
		<img alt = '_robot' src={`https://www.robohash.org/$email={robot[0].email}{props.id}?200x200`}/>
		<div>
		<h2>{name}</h2>
		<p>{email}</p>
		</div>
		</div>
		 );
}
export default card; 