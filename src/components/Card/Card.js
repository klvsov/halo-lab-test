import { Button } from '../Button/Button.js';

import './Card.css';

export const Card = ({ category, name, price, openModal }) => {
  return (
    <div className="card-wrapper">
      <p className="card-category">{category}</p>
      <h2 className="card-name">{name}</h2>
      <div className="card-buy">
        <div className="card-price">
          <span>$</span>
          {price}
        </div>
        <div className="card-btn">
          <Button
            title={'Buy'}
            onClickHandler={() => openModal(category, name, price)}
          />
        </div>
      </div>
    </div>
  );
};
