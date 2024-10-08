import { FC, memo } from 'react';

type CategoriesProps = {
  categoryId: number;
  setCategoryId: (id: number) => void;
};

export const Categories: FC<CategoriesProps> = memo(({ categoryId, setCategoryId }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id) => (
          <li
            key={id}
            onClick={() => setCategoryId(id)}
            className={categoryId === id ? 'active' : ''}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});
