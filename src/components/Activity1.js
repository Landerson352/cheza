import React from 'react';
import { Flex, Image, Grid } from '@chakra-ui/core';
import { identity, map, shuffle, times } from 'lodash';

const getShuffledSymbols = (count) => shuffle(times(count, identity));

const Activity1 = (props) => {
  const { count = 4 } = props;
  const columns = Math.ceil(Math.sqrt(count));
  const [symbols, setSymbols] = React.useState(getShuffledSymbols(count));
  const [tapped, setTapped] = React.useState(0);
  const handleImageMouseDown = (index) => {
    // Force source order this this line:
    if (symbols[index] !== tapped) return;

    setTapped((n) => n + 1);
  };
  React.useEffect(() => {
    const reset = () => {
      setSymbols(getShuffledSymbols(count));
      setTapped(0);
    };
    let resetTimeout;
    if (tapped >= count) {
      resetTimeout = setTimeout(reset, 1000);
    }
    return () => {
      clearTimeout(resetTimeout);
    };
  }, [count, setSymbols, setTapped, tapped]);
  return (
    <Flex alignItems="center" justifyContent="center" flexGrow="1">
      <Flex width="100vmin" height="100vmin" alignItems="center" justifyContent="center">
        <Grid gridTemplateColumns={times(columns, () => '1fr').join(' ')} gridGap="5vmin" margin="10vmin">
          {map(symbols, (symbol, index) => (
            <Image
              key={symbol}
              borderRadius="50%"
              src={`./symbols/disc-${symbol + 1}.png`}
              visibility={tapped > symbol ? 'hidden' : 'visible'}
              onMouseDown={() => handleImageMouseDown(index)}
            />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Activity1;
