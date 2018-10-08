import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import '../styles/Table.css';
import { connect } from 'react-redux';
import { flipCard, matchCards } from '../actions/actions';
import cardBack from '../styles/images/card-back.jpg';

const mapStateToProps = state => ({ grid: state.get('grid'), flippedCards: state.get('flippedCards') });

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
	// console.log(props);
	const { grid } = props;
	const { flippedCards } = props;
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

	// const table = grid.map((card, i) => (
	// 	<div role="presentation" onClick={(!card.correct) && (!card.flipped) ? () => props.flipCard(i) : null} key={uuidv4()} className={`card ${card.correct && 'hidden'}`}>
	// 		{!card.flipped ? <img src={cardBack} alt="back" /> : <img src={card.img} alt="" />}
	// 	</div>
	// ));

	return (
		<div className="table">
			{table}
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
};

const Table = connect(mapStateToProps, mapDispatchToProps)(ConnectedTable);

export default Table;
