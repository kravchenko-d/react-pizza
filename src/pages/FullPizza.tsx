import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://2e28a9697dc27353.mokky.dev/items/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при загрузке');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Загрузка...';
  }

  return (
    <div className="container">
      <div className="product">
      <img style={{ margin: '12px 0' }} src={pizza.imageUrl} alt={pizza.title} />
      <h2 style={{ marginBottom: '12px' }}>{pizza.title}</h2>
      <h3 style={{marginBottom: '20px'}} >Цена: от {pizza.price} ₽</h3>
      </div>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
