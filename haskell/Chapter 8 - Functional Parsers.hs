type Parser a = String -> [(a,String)]

item :: Parser Char
item = \inp -> case inp of
                  []     -> []
                  (x:xs) -> [(x,xs)]

failure :: Parser a
failure = \inp -> []

return' :: a -> Parser a
return' v = \inp -> [(v,inp)]

(+++) :: Parser a -> Parser a -> Parser a
p +++ q = \inp -> case p inp of
                     []        -> parse q inp
                     [(v,out)] -> [(v,out)]

parse :: Parser a -> String -> [(a,String)]
parse p inp = p inp


--a y = [x | x <- item y]

--b = do{ x <- item
--      ; x
--      }

--p :: Parser (Char,Char)
--p = do{ x <- item
--      ; z <- item
--      ; y <- item
--      ; return' (x,y)
--      }

--p = item >>= \ x ->
--      item >>= \ z ->
--        item >>= \y ->
--          return' (x,y)

--sat :: (Char -> Bool) -> Parser Char
--sat p = do x <- item
--           if p x then
--              return' x
--            else
--              failure
