import {useState} from 'react';
type CategoryType = 'Phone' | 'Email';
export const useCreateAccountProps = () => {
  const [selectedCategory, setSelectedCategory] = useState('Phone');
  const handleCategory = (type: CategoryType) => {
    setSelectedCategory(type);
  };
  return {
    handleCategory,
    selectedCategory,
  };
};
