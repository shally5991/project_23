import React from 'react';

const Navigation = ({onRoutechange,issignedout}) => {
	
	if(issignedout){
		return(
			<nav style={{display: 'flex',justifyContent: 'flex-end'}}>
			<p onClick = {()=>onRoutechange('signout')} className='f3 link dim black underline pa3 pointer' >Sign Out</p>
			</nav>
		);
	}

	else{
		 return (
			<nav style={{display: 'flex',justifyContent: 'flex-end'}}>	
			<p onClick = {()=>onRoutechange('signin')} className='f3 link dim black underline pa3 pointer' >SignIn</p>
			<p onClick = {()=>onRoutechange('register')} className='f3 link dim black underline pa3 pointer' >Register</p>
			</nav>

			);
		}
	
}

export default Navigation;