import { useState } from 'react';
import '../css/water.css';
import WaterImage from '../images/water.png';
import Plus from '../images/plus.svg';
import Minus from '../images/minus.svg';

const Water = () => {
    const [water, setWater] = useState(0);
    const incrementWater = () => {
        setWater(water + 1000);
    };

    const decrementWater = () => {
        water > 0 &&
            setWater(water - 1000);
    };

    return (
        <div className="water component">
            <div className="component-image">
                <img src={WaterImage} alt="water" />
            </div>
            <h3 className="waterAmount">{water} ml</h3>
            <div className="waterIncrements">
                <div className="waterDecrement" onClick={decrementWater}>
                    <img src={Minus} alt="Subtract water" />
                </div>
                <div className="waterIncrement" onClick={incrementWater}>
                    <img src={Plus} alt="Add water" />
                </div>
            </div>
        </div>
    );
};

export default Water;