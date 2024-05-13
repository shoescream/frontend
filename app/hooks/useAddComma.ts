const useAddComma = () => {
  const addComma = (price: number) => {
    return price.toLocaleString();
  };

  return addComma;
};

export default useAddComma;
