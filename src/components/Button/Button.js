import './Button.css';

export const Button = ({ contained = false, title, onClickHandler }) => {
  const classNames = ['btn', contained ? 'contained' : 'outlined'];
  return (
    <button className={classNames.join(' ')} onClick={onClickHandler}>
      {title}
    </button>
  );
};
