import styles from '../../../../styles/Home.module.css';
import { TypeAnimation } from 'react-type-animation';


export default function MenuItem(props) {
        return (
            <TypeAnimation
              sequence={[
                props.menuName,
              ]}
              speed={200}
              style={{ fontSize: '1.5em', display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "center"}}
              repeat={0}
              cursor={true}
            />
          );

}
