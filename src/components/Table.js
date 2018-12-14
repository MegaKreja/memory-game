import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import '../styles/Table.css';
import { connect } from 'react-redux';
import { flipCard, matchCards } from '../actions/actions';
import cardBack from '../styles/images/card-back.jpg';
import iWon from '../styles/images/iWonGif.gif';

const mapStateToProps = state => ({ grid: state.get('grid'), flippedCards: state.get('flippedCards'), counter: state.get('counter') });

const mapDispatchToProps = dispatch => ({
	flipCard: (index) => {
		dispatch(flipCard(index));
	},
	matchCards: () => {
		setTimeout(() => {
			dispatch(matchCards());
		}, 1000);
	},
});

const ConnectedTable = (props) => {
	const { grid } = props;
	const { flippedCards } = props;
	const { counter } = props;
	if (flippedCards.size === 2) {
		props.matchCards();
	}

	const table = grid.map((card, i) => (
		<div
			role="presentation"
			onClick={(!card.get('correct')) && (!card.get('flipped')) ? () => props.flipCard(i) : null}
			key={uuidv4()}
			className={`card ${card.get('correct') && 'hidden'}`}
		>
			{!card.get('flipped') ? <img src={cardBack} alt="back" /> : <img src={card.get('img')} alt="" />}
		</div>
	));

	return (
		<div className="table">
			{counter < 8 ? table : <img src={iWon} alt="I won gif" />}
		</div>
	);
};

ConnectedTable.propTypes = {
	flipCard: PropTypes.func.isRequired,
	matchCards: PropTypes.func.isRequired,
	grid: PropTypes.arrayOf(
		PropTypes.shape({
			img: PropTypes.string.isRequired,
			flipped: PropTypes.bool.isRequired,
			correct: PropTypes.bool.isRequired,
		}).isRequired
	).isRequired,
	flippedCards: PropTypes.arrayOf(
		PropTypes.shape({
			img: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
		}).isRequired
	).isRequired,
	counter: PropTypes.number.isRequired,
};

const Table = connect(mapStateToProps, mapDispatchToProps)(ConnectedTable);

export default Table;
