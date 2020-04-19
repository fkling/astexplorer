export default function cx(clsObj) {
  return Object.keys(clsObj).filter(k => clsObj[k]).join(' ');
}
