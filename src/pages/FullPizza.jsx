import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const FullPizza = () => {
  const [pizza, setPizza] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://2e28a9697dc27353.mokky.dev/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('AXIOS', error);
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};
