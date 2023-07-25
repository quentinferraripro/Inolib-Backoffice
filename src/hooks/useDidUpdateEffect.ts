/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, type DependencyList, type EffectCallback } from "react";

/**
 * Accepts a function that contains imperative, possibly effectful code.
 *
 * Unlike `useEffect`, `useDidUpdateEffect` is not called for the initial render.
 *
 * @param effect Imperative function that can return a cleanup function.
 * @param deps If present, effect will only activate if the values in the list change.
 *
 * @see {@link https://react.dev/reference/react/useEffect}
 */
export const useDidUpdateEffect = (effect: EffectCallback, deps?: DependencyList | undefined) => {
  const didUpdate = useRef(false);

  useEffect(() => {
    if (!didUpdate.current) {
      return void (didUpdate.current = true);
    }

    return effect();
  }, deps);
};
