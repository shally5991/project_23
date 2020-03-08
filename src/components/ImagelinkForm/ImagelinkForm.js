import React from 'react';
import './ImagelinkForm.css';

const ImagelinkForm = ({onInputChange,  onButtonsubmit}) => {
	return (
			<div>
				<p className = 'F3'>
				{'This Magic Brain will detect faces in your pictures,Give it a try'}
				</p>
				
				<div className = 'center'>
					<div className = 'center form pa4 br3 shadow-5'>
						 <input className='f4 pa2 w-70 center' type ='tex' onChange = {onInputChange} />
						 <button className = 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick = {onButtonsubmit}>Detect</button>
					</div>
				</div>
				
			</div>
			);
}

export default ImagelinkForm;