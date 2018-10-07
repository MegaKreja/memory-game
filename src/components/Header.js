import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartGame } from '../actions/actions';
import '../styles/Header.css';

const mapDispatchToProps = dispatch => ({
	restart: () => dispatch(restartGame()),
});

const ConnectedHeader = (props) => {
	const { restart } = props;
	return (
		<div className="header">
			<h1>Breaking Bad Memory Game</h1>
			<button type="button" className="btn third" onClick={restart}>Restart</button>
		</div>
	);
};

ConnectedHeader.propTypes = {
	restart: PropTypes.func.isRequired,
};

const Header = connect(null, mapDispatchToProps)(ConnectedHeader);
export default Header;
