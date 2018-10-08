import { fromJS } from 'immutable';
import { FLIP_CARD, RESTART_GAME, MATCH_CARDS } from '../constants/actionTypes';
import generateGrid from '../data/generateGrid';

const initialState = fromJS({
	grid: generateGrid(),
	flippedCards: [],
});

// console.log(initialState.get('flippedCards'));
// let flipCard = { img: initialState.get('grid').get(0).get('img'), index: 1 };
// // initialState = initialState.setIn(['grid', 0, 'flipped'], true).setIn(['grid', 0, 'correct'], true);
// // initialState = initialState.set('flippedCards', initialState.get('flippedCards').push('gringo'));
// // initialState = initialState.set('flippedCards', initialState.get('flippedCards').push('gringo'));
// initialState = initialState.set('flippedCards', initialState.get('flippedCards').push(flipCard));
// flipCard = { img: initialState.get('grid').get(1).get('img'), index: 2 };
// initialState = initialState.set('flippedCards', initialState.get('flippedCards').push(flipCard));
// console.log(initialState.get('flippedCards').get(0).img.toString() !== initialState.get('flippedCards').get(1).img.toString());
// console.log(initialState.get('flippedCards').get(0).img, initialState.get('flippedCards').get(1).img);
// // console.log(initialState.get('flippedCards').get(0).index);
// // console.log(initialState.get('flippedCards').size);
// // console.log(initialState);

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
	case FLIP_CARD: {
		let newState = state;
		const img = newState.get('grid').get(0).get('img');
		// const flippedCards = newState.get('flippedCards');
		const { index } = action;
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
			if (newState.get('flippedCards').get(0) !== newState.get('flippedCards').get(1)) {
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
