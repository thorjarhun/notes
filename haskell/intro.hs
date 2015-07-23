--import Debug.Trace

-- Apply ($)
-- ($) :: (a -> b) -> a -> b
-- f $ x = f x

-- Compose (.)
-- (.) :: (b -> c) -> (a -> b) -> a -> c
-- (f . g) x = f (g x)

double x = x + x
quadruple = double.double

factorial n = product [1..n]
average ns = sum ns `div` length ns

add' :: Int -> (Int -> Int)
add' = \x -> \y -> x + y

abs' :: Int -> Int
abs' n | n >= 0    = n
       | otherwise = -n

sign n | n < 0     = -1
       | n == 0    = 0
       | otherwise = 1

not' :: Bool -> Bool
not' False = True
not' True = False

(&&$) a b = if a == True then b else False

True &&$$ b = b
_    &&$$ _ = False


-- cons operator: (:)
-- 1 : (2 : (3 : (4 : []))) == [1,2,3,4]


-- pattern matching
head' :: [a] -> a
head' (x:_)  = x

tail' :: [a] -> [a]
tail' (_:xs) = xs

-- list comprehension
-- [x^2 | x <- [1..5]] == [1,4,9,16,25]
-- [(x,y) | x <- [1,2,3], y <- [4,5]] == [(1,4),(1,5),(2,4),(2,5),(3,4),(3,5)]
-- [(x,y) | x <- [1..3], y <- [x..3]] == [(1,1),(1,2),(1,3),(2,2),(2,3),(3,3)]
-- [x | x <- [1..10], even x] == [2,4,6,8,10]

concat' :: [[a]] -> [a]
concat' xss = [x | xs <- xss, x <- xs]

factors :: Int -> [Int]
factors n = [x | x <- [1..n], n `mod` x == 0]

prime :: Int -> Bool
prime n = factors n == [1,n]

primes:: Int -> [Int]
primes n = [x | x <- [2..n], prime x]

-- recursion
factorial_2 0 = 1
factorial_2 n = n * factorial_2 (n - 1)

factorial_3 n | n == 0    = 1
              | otherwise = n * factorial_3 (n - 1)

-- recursion and pattern matching
product' :: [Int] -> Int
product' []     = 1
product' (x:xs) = x * product' xs

length' :: [x] -> Int
length' []     = 0
length' (_:xs) = 1 + length' xs

reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]

zip' :: [a] -> [b] -> [(a,b)]
zip' []     _      = []
zip' _      []     = []
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys

-- append (I like this one)
(++*) :: [a] -> [a] -> [a]
[]     ++* ys = ys
(x:xs) ++* ys = x : (xs ++* ys)

qsort :: [Int] -> [Int]
qsort []     = []
qsort (x:xs) = qsort smaller ++ [x] ++ qsort larger
               where
                  smaller = [a | a <- xs, a <= x]
                  larger  = [b | b <- xs, b > x]