import { FLIP_CARD, RESTART_GAME, MATCH_CARDS } from '../constants/actionTypes';
import generateGrid from '../data/generateGrid';

const initialState = {
	grid: generateGrid(),
	flippedCards: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
	case FLIP_CARD: {
		const newState = Object.assign({}, state);
		const { grid } = newState;
		const { flippedCards } = newState;
		const { index } = action;
		const flipCard = { img: grid[index].img, index };
		if (flippedCards.length < 2) {
			Object.assign(newState, {
				...newState,
				grid: grid.map((card, i) => (i === index ? { ...card, flipped: true } : card)),
				flippedCards: flippedCards.concat(...state, flipCard),
			});
		}
		return { ...newState };
	}
	case MATCH_CARDS: {
		const newState = Object.assign({}, state);
		const { grid } = newState;
		const flippedArr = newState.flippedCards;
		if (flippedArr.length === 2) {
			if (flippedArr[0].img !== flippedArr[1].img) {
				Object.assign(newState, {
					...newState,
					grid: grid.map((card, i) => ((i === flippedArr[0].index) || (i === flippedArr[1].index) ? { ...card, flipped: false } : card)),
					flippedCards: [],
				});
			} else {
				Object.assign(newState, {
					...newState,
					grid: grid.map((card, i) => ((i === flippedArr[0].index) || (i === flippedArr[1].index) ? { ...card, flipped: true, correct: true } : card)),
					flippedCards: [],
				});
			}
		}
		return { ...newState };
	}
	case RESTART_GAME:
		return {
			grid: generateGrid(),
			flippedCards: [],
		};
	default:
		return state;
	}
};

export default rootReducer;
