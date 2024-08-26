import { Link } from 'react-router-dom';
import emptyCartImage from '../assets/img/empty-cart.png';

export const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пуста 😕
      </h2>
      <p>
        Вероятнее всего, вы ещё не заказывали пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейдите на главную страницу.
      </p>
      <img src={emptyCartImage} alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};
