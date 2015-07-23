a :: IO (Char,Char)
a = do x <- getChar
       getChar
       y <- getChar
       return (x,y)

-- Equivalently,
--a = getChar >>= \x ->
--      getChar >>= \_ ->
--        getChar >>= \y ->
--          return (x,y)

--getLine :: IO String
--getLine = do x <- getChar
--             if x == '\n' then
--               return []
--             else
--               do xs <- getLine
--                  return (x:xs)

strlen :: IO ()
strlen = do putStr "Enter a string: "
            xs <- getLine
            putStr "The string has "
            putStr (show (length xs))
            putStrLn " characters"

-- Simple hangman implementation
hangman :: IO ()
hangman = do putStr "Think of a word: "
             word <- sgetLine
             putStrLn "Try to guess it:"
             guess word

sgetLine :: IO String
sgetLine = do x <- getChar
              if x == '\n' then
                do putChar x
                   return []
              else
                do putChar '-'
                   xs <- sgetLine
                   return (x:xs)

guess :: String -> IO ()
guess word = do putStr "> "
                xs <- getLine
                if xs == word then
                  putStrLn "You got it!"
                else
                  do putStrLn (diff word xs)
                     guess word

diff :: String -> String -> String
diff xs ys = [if elem x ys then x else '-' | x <- xs]


interactive_dialog pr p t s n w =
  do pr
     xs <- getLine
     if (p (xs)) then
       t xs
     else
       do s xs
          interactive_dialog pr p t s n (n w)

guess' word = interactive_dialog (putStr "> ") (\xs -> xs == word) (\x -> putStrLn "You got it!") (\xs -> putStrLn (diff word xs)) (\x -> x) word