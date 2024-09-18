import { TypeAnimation } from 'react-type-animation';

const AnimatedLeadTitle = ({headers}) => {
  const sequence = headers.flatMap(header => [header, 2000]);
  return (
    <TypeAnimation
      sequence={sequence}
      speed={200}
      style={{ fontSize: '2em', color: '#00FF00', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"}}
      repeat={Infinity}
    />
  );
};

export default AnimatedLeadTitle;