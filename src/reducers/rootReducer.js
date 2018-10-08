import { fromJS } from 'immutable';
import { FLIP_CARD, RESTART_GAME, MATCH_CARDS } from '../constants/actionTypes';
import generateGrid from '../data/generateGrid';

const initialState = fromJS({
	grid: generateGrid(),
	flippedCards: [],
});

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
	case FLIP_CARD: {
		let newState = state;
		const { index } = action;
		const img = newState.get('grid').get(index).get('img');
		// const flippedCards = newState.get('flippedCards');
		const flipCard = { img, index };
		if (newState.get('flippedCards').size < 2) {
			newState = newState.setIn(['grid', index, 'flipped'], true);
			newState = newState.set('flippedCards', newState.get('flippedCards').push(flipCard));
		}
		return newState;
	}
	case MATCH_CARDS: {
		let newState = state;
		// const flippedCards = newState.get('flippedCards');
		if (newState.get('flippedCards').size === 2) {
			if (newState.get('flippedCards').get(0).img !== newState.get('flippedCards').get(1).img) {
				newState = newState.setIn(['grid', newState.get('flippedCards').get(0).index, 'flipped'], false);
				newState = newState.setIn(['grid', newState.get('flippedCards').get(1).index, 'flipped'], false);
				newState = newState.set('flippedCards', fromJS([]));
			} else {
				newState = newState.setIn(['grid', newState.get('flippedCards').get(0).index, 'flipped'], true).setIn(['grid', newState.get('flippedCards').get(0).index, 'correct'], true);
				newState = newState.setIn(['grid', newState.get('flippedCards').get(1).index, 'flipped'], true).setIn(['grid', newState.get('flippedCards').get(1).index, 'correct'], true);
				newState = newState.set('flippedCards', fromJS([]));
			}
		}
		return newState;
	}
	case RESTART_GAME:
		return fromJS({
			grid: generateGrid(),
			flippedCards: [],
		});
	default:
		return state;
	}
};

export default rootReducer;
