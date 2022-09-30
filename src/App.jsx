import { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Stack,
  Heading,
  Button,
  Text,
  List,
  ListItem,
} from "@chakra-ui/react";

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [dice, setDice] = useState(1);
  const [error, setError] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  const numbers = [1, 2, 3, 4, 5, 6];

  const gameStartHandler = () => {
    setGameStarted(true);
  };
  const clickedNumber = (value) => {
    setSelectedNumber(value);
    setError(null);
  };

  // random number generate
  const getRandomNumber = () => {
    if (selectedNumber) {
      const generatedNumber = Math.ceil(Math.random() * 6);
      setDice(generatedNumber);

      if (selectedNumber === generatedNumber) {
        setTotalScore((prevValue) => prevValue + generatedNumber);
      } else {
        setTotalScore((prevValue) => prevValue - 2);
      }
    } else {
      setError("Please select a number");
    }
  };

  return (
    <>
      {gameStarted ? (
        <>
          <Stack
            justify="center"
            align="center"
            maxW="1300px"
            mx="auto"
            h="100vh"
          >
            <Heading
              color={error ? "red" : "black"}
              fontSize="6xl"
              as="h1"
              mb="8"
            >
              {error ? error : "Select Number"}
            </Heading>

            <Flex pb="10">
              {numbers.map((value) => (
                <Flex
                  justify="center"
                  align="center"
                  h="50px"
                  w="50px"
                  bg={selectedNumber === value ? "green" : "black"}
                  color="white"
                  fontSize="2xl"
                  mr={4}
                  borderRadius="lg"
                  key={value}
                  onClick={() => clickedNumber(value)}
                >
                  {value}
                </Flex>
              ))}
            </Flex>

            <Box h="150px" w="150px" onClick={getRandomNumber}>
              <Image src={`/src/assets/dice/dice${dice}.png`} />
            </Box>

            <Text as="p" fontSize="xl">
              Click on dice to roll
            </Text>
            <Text
              color={totalScore > 0 ? "green" : "red"}
              fontSize="8xl"
              fontWeight="bold"
            >
              {totalScore}
            </Text>
            <Text fontSize="6xl" fontWeight="bold">
              Total Score
            </Text>

            <Button colorScheme="teal" onClick={() => setTotalScore(0)}>
              Reset Score
            </Button>
          </Stack>

          <Stack maxW="900px" mx="auto">
            <Heading as="h2">Game Rules:</Heading>
            <List>
              <ListItem> Select any number.</ListItem>
              <ListItem> Click on dice to roll.</ListItem>
              <ListItem>
                Select number is equal to obtained dice results then you will
                get same point of dice.
              </ListItem>
            </List>
          </Stack>
        </>
      ) : (
        <Flex align="center" justify="center">
          <Image src="/src/assets/dices.png" width="50%" />
          <Stack>
            <Heading fontSize="6xl" as="h1">
              The Dice Game
            </Heading>
            <Button
              alignSelf="flex-end"
              colorScheme="teal"
              onClick={gameStartHandler}
            >
              Start Game
            </Button>
          </Stack>
        </Flex>
      )}
    </>
  );
};

export default App;
