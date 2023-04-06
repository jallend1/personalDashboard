import { useState } from 'react';
import WaterImage from '../images/water.png';

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
                <button onClick={decrementWater}>-</button>
                <button onClick={incrementWater}>+</button>
            </div>
        </div>
    );
};

export default Water;