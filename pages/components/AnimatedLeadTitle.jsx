import { TypeAnimation } from 'react-type-animation';

const AnimatedLeadTitle = () => {
  return (
    <TypeAnimation
      sequence={[
        'Jose Herrera is a Software Engineer.',
        2000,
        'Jose Herrera does Blockchain Engineering.',
        2000,
        'Jose Herrera specializes in Solidity/EVM work.',
        2000,
        'Jose Herrera also likes to make neat websites',
        2000
      ]}
      speed={200}
      style={{ fontSize: '2em', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"}}
      repeat={Infinity}
    />
  );
};

export default AnimatedLeadTitle;