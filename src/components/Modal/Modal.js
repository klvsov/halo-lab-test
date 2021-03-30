import { Form } from '../Form/Form';

import './Modal.css';

export const Modal = ({ category, name, price, onClose }) => {
  return (
    <>
      <div className="overlay">
        <div className="modal-wrapper">
          <p className="card-category">{category}</p>
          <h2 className="card-name">{name[0].toUpperCase() + name.slice(1)}</h2>
          <div className="card-price modal-price">
            <span>$</span>
            {price}
          </div>
          <Form name={name} category={category} price={price} />
          <span className="close" onClick={onClose}>
            &#10006;
          </span>
        </div>
      </div>
    </>
  );
};
