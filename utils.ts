// dot :: (B -> C) -> (A -> B) -> A -> C
export const dot = <B, C>(f: (n: B) => C) => <A>(g: (n: A) => B) => (n: A): C => f(g(n));
