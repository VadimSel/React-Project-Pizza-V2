import { useEffect, useState } from 'react';
import './App.css';

import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { PizzaBlock } from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";
import { Sort } from "./components/Sort";
import './scss/app.scss';

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("https://66c9fd0759f4350f064e1891.mockapi.io/items")
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
            ? [...new Array(6).map((_, index) => <Skeleton key={index}/>)]
            : items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>)}
            {/* {
              items.map(obj => (
                <PizzaBlock
                  key={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                  />
              ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


// 27 57