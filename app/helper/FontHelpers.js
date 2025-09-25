import { Dimensions } from 'react-native';
const { width } = Dimensions.get("window");




const scaleFont = (size) => {
  const scale = width / 375;
  return Math.round(size * scale);
};

export { scaleFont };

