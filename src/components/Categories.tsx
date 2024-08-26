import { FC } from "react";

type CategoriesProps = {
  categoryId: number;
  setCategoryId: any;
}

const Categories: FC<CategoriesProps> = ({ categoryId, setCategoryId }) => {
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
}

export default Categories;
