// Format numbers
const formatNum = (num) => {
  return new Intl.NumberFormat([], {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};
export default formatNum;
