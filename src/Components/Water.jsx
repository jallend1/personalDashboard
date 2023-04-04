import { useState } from 'react';

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
            <h2>Water Consumed</h2>
            <h3 className="waterAmount">{water} ml</h3>
            <div className="waterIncrements">
                <button onClick={incrementWater}>+</button>
                <button onClick={decrementWater}>-</button>
            </div>
        </div>
    );
};

export default Water;