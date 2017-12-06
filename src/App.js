import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './common/style/goodsSort.css';
import data from './common/data/goodsSortData.js';

/*class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      duringTime: 1000,
      time: null
    };
  }
  componentDidMount() {
    let self = this;
    this.state.time = setInterval(() => {
      self.tick();
    },self.state.duringTime);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.date.toLocaleString()}
      </div>
    );
  }
}*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }
  selectedItem(item,order) {
    let {selected} = this.state;
    let isThere = selected.some((ele) => {
      return ele.order === order;
    });

    if(isThere) {
      selected.map((elt) => {
        if(elt.order === order) {
          elt.item = item;
        }
      })
    }else {
      selected.push({item: item, order});
    }

    selected.sort( (a,b) => {
      return a.order-b.order;
    });
    this.setState({selected});

  }

  onDelete(order) {
    let {selected} = this.state;
    selected = selected.filter( (item) => {
      if(item.order !== order) {
        return item;
      }
    });
    this.setState({selected});
  }

  render() {

    let {selected} = this.state;

    let selectedList = selected.map( (item) => {
      return (
        <mark key={item.item.id}>
        <a 
          onClick = {
            (ev) => {
              this.onDelete(item.order);
            }
          }
        >x</a>
          {item.item.desc}
        </mark>
      );
    });

    let list = data.map( (ele) => {
      let {selected} = this.state;
      return (
        <li key={ele.id}>
          {ele.sort}: 
          {
            ele.data.map( (item) => {
              return (
                <a
                key={item.id} 
                onClick={() => {this.selectedItem(item,ele.order)}}
                className={selected.some((ele) => {return ele.item.id === item.id}) ? 'active':''}
                >{item.desc}</a>
              );
            })
          }
        </li>
      )
    });

    return (
      <div id="wrap">
        <section id="section">
          <nav id="choose">
          你的选择: {selectedList}
          </nav>
          <ul id='type'>
            {list}
          </ul>
        </section>
      </div>
    );
  }
}

export default App;
