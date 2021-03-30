import { useEffect, useState } from 'react';

import { Card } from './components/Card/Card';
import { Button } from './components/Button/Button';
import { Loading } from './components/Loading/Loading';
import { Modal } from './components/Modal/Modal';

import './App.css';

const App = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectName, setSelectName] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [selectPrice, setSelectPrice] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (category, name, price) => {
    setShowModal(true);
    setSelectName(name);
    setSelectCategory(category);
    setSelectPrice(price);
  };

  const getCheapest = () => {
    let cheapest = goods[0].price;
    goods.map((goodsItem) => {
      if (goodsItem.price < cheapest) {
        setSelectName(goodsItem.name);
        setSelectCategory(goodsItem.category);
        setSelectPrice(goodsItem.price);
        cheapest = goodsItem.price;
      }
      return cheapest;
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetch('https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e')
      .then((response) => response.json())
      .then((data) => {
        setGoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingError(true);
      });
  }, []);

  return (
    <>
      {loadingError && <h2 className="error-message">Error loading data...</h2>}
      {loading && !loadingError ? (
        <Loading />
      ) : (
        <div className="app">
          {goods.map(({ name, category, price }) => (
            <Card
              key={name + price.toString()}
              name={name[0].toUpperCase() + name.slice(1)}
              category={category}
              price={price}
              openModal={openModal}
            />
          ))}
          {!loadingError && (
            <div className="cheapest">
              <Button
                title="Buy cheapest"
                contained
                onClickHandler={getCheapest}
              />
            </div>
          )}
        </div>
      )}
      {showModal && (
        <Modal
          openModal={openModal}
          onClose={closeModal}
          name={selectName}
          category={selectCategory}
          price={selectPrice}
        />
      )}
    </>
  );
};

export default App;
