-- http://journal.batard.info/post/2008/03/02/ski-calculus-in-haskell-shell

module SKI where

data Nat = Zero | Succ Nat

instance Show Nat where
        show n = "Natural " ++ (show $ count n) where
                count Zero = 0
                count (Succ n) = 1 + count n

s = \x y z -> x z (y z)
k = \x y -> x
i = \x -> x

mkChurch n = \f x -> (iterate f x) !! n