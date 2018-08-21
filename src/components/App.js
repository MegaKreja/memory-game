import React, { Component } from 'react';
import walter from "../styles/images/walter.jpg";
import skyler from "../styles/images/skyler.jpg";
import jesse from "../styles/images/jesse.jpg";
import hank from "../styles/images/hank.jpg";
import marie from "../styles/images/marie.jpg";
import mike from "../styles/images/mike.jpg";
import saul from "../styles/images/saul.jpg";
import gustavo from "../styles/images/gustavo.jpg";
import huell from "../styles/images/huell.png";
import badger from "../styles/images/badger.jpg";
import skinnyPete from "../styles/images/skinny-pete.jpg";
import walterjr from "../styles/images/walterjr.jpg";
import '../styles/App.css';
import Header from "./Header";
import Table from "./Table";

class App extends Component {
  state = {
    grid: [],
    flippedCards: []
  }

  createRandomGrid = () => {
    // arr with imports
    const arr = [
      {
        img: walter,
        flipped: false,
        correct: false
      },
      {
        img: skyler,
        flipped: false,
        correct: false
      },
      {
        img: jesse,
        flipped: false,
        correct: false
      },
      {
        img: hank,
        flipped: false,
        correct: false
      },
      {
        img: marie,
        flipped: false,
        correct: false
      },
      {
        img: mike,
        flipped: false,
        correct: false
      },
      {
        img: saul,
        flipped: false,
        correct: false
      },
      {
        img: huell,
        flipped: false,
        correct: false
      },
      {
        img: skinnyPete,
        flipped: false,
        correct: false
      },
      {
        img: badger,
        flipped: false,
        correct: false
      },
      {
        img: gustavo,
        flipped: false,
        correct: false
      },
      {
        img: walterjr,
        flipped: false,
        correct: false
      },
    ];
    const grid = arr.concat(arr);
    grid.sort(() => {
      return 0.5 - Math.random()
    })
    this.setState({grid: grid});
    this.setState({flippedCards: []});
  }

  openCard = (index) => {
    let grid = this.state.grid.slice();
    let flippedCards = this.state.flippedCards.slice();
    console.log(flippedCards); 
    if(flippedCards.length < 2) {
      grid[index] = {img: grid[index].img, flipped: true, correct: false};
      this.setState({grid: grid});
      let flipCard = {img: grid[index].img, index: index};
      flippedCards.push(flipCard);
      this.setState({flippedCards: flippedCards});
      if(flippedCards.length === 2) {
        if(flippedCards[0].img !== flippedCards[1].img) {
          setTimeout(() => {
          grid[flippedCards[0].index] = {img: flippedCards[0].img, flipped: false, correct: false};
          grid[flippedCards[1].index] = {img: flippedCards[1].img, flipped: false, correct: false};
          this.setState({grid: grid});
          this.setState({flippedCards: []});
          },1200)
        } else {
          grid[flippedCards[0].index] = {img: flippedCards[0].img, flipped: true, correct: true};
          grid[flippedCards[1].index] = {img: flippedCards[1].img, flipped: true, correct: true};
          this.setState({grid: grid});
          this.setState({flippedCards: []});
        }
      }
    } 
  }

  componentDidMount() {
    this.createRandomGrid();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    return (
      <div className="app">
        <Header restart={this.createRandomGrid}/>
        <Table grid={this.state.grid} openCard={this.openCard}/>
      </div>
    );
  }
}

export default App;
