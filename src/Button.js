import React from 'react';
//import { kouti } from './kouti';
import 'tachyons';

const Button = (props) => {
	return (
			<button className="tc fl w-10 ma3" type="button" >{props.name}</button>
		);
}

export default Button;