export default function(baseName) {
  let name = baseName;
  if (this.props.className) {
    name += ' ' + this.props.className;
  }
  return name;
};
