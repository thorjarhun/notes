twice  :: (a -> a) -> (a -> a)
twice f = f.f	-- twice f x = f (f x)

-- Map Function:
-- map f xs = [f x | x <- xs]
--
-- map f []     = []
-- map f (x:xs) = f x : map f xs

-- Filter Function:
-- filter p xs = [x | x <- xs, p x]
--
-- filter p []     = []
-- filter p (x:xs)
--    | p x        = x : filter p xs
--    | otherwise  = filter p xs

-- The Foldr (fold right) Function:
-- A number of functions on lists can be defined using the following simple pattern of recursion:
-- f []     = v
-- f (x:xs) = x ⊕ f xs
-- f maps the empty list to some value v, and any non-empty list to some function ⊕ applied to its head and f of its tail.

-- sum []     = 0		-- v = 0
-- sum (x:xs) = x + sum xs	-- ⊕ = +

-- product []     = 1			-- v = 1
-- product (x:xs) = x * product xs	-- ⊕ = *

-- and []     = True		-- v = True
-- and (x:xs) = x && and xs	-- ⊕ = &&

foldr' :: (a -> b -> b) -> b -> [a] -> b
foldr' f v []     = v
foldr' f v (x:xs) = f x (foldr' f v xs)
-- It is best to think of foldr' non-recursively, as simultaneously replacing each (:) in a list by a given function, and [] by a given value.

-- sum = foldr' (+) 0
-- product = foldr' (*) 1
-- or = foldr' (||) False
-- and = foldr' (&&) True
-- length = foldr' ((+).(\_ -> 1)) 0
-- reverse = foldr' (\x xs -> xs ++ [x]) []
-- (++) xs ys = foldr' (:) ys xs
-- map f = foldr' (\x xs -> f x : xs) []