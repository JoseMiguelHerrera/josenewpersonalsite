import { TypeAnimation } from 'react-type-animation';

const AnimatedLeadTitle = ({ headers= [], isMobile }) => {
  const sequence = headers.flatMap(header => [header, 2000]);
    return (
      <TypeAnimation
        sequence={sequence}
        speed={200}
        style={{ fontSize: '1.25em', color: '#00FF00',fontWeight: 'bold',display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center" }}
        repeat={Infinity}
      />
    );
};

export default AnimatedLeadTitle;