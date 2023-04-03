const Greeting = ({ userFirstName }) => {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = 'morning';
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = 'afternoon';
  } else {
    timeOfDay = 'evening';
  }

  return (
    <div className="greeting">
      <h1>Good {timeOfDay}, {userFirstName}.</h1>
    </div>
  );
};

export default Greeting;
