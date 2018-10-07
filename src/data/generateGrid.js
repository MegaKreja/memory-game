import walter from '../styles/images/walter.jpg';
import skyler from '../styles/images/skyler.jpg';
import jesse from '../styles/images/jesse.jpg';
import hank from '../styles/images/hank.jpg';
import marie from '../styles/images/marie.jpg';
import mike from '../styles/images/mike.jpg';
import saul from '../styles/images/saul.jpg';
import gustavo from '../styles/images/gustavo.jpg';

const generateGrid = () => {
	const arr = [
		{
			img: walter,
			flipped: false,
			correct: false,
		},
		{
			img: skyler,
			flipped: false,
			correct: false,
		},
		{
			img: jesse,
			flipped: false,
			correct: false,
		},
		{
			img: hank,
			flipped: false,
			correct: false,
		},
		{
			img: marie,
			flipped: false,
			correct: false,
		},
		{
			img: mike,
			flipped: false,
			correct: false,
		},
		{
			img: saul,
			flipped: false,
			correct: false,
		},
		{
			img: gustavo,
			flipped: false,
			correct: false,
		},
	];
	const grid = arr.concat(arr);
	grid.sort(() => 0.5 - Math.random());
	return grid;
};

export default generateGrid;
