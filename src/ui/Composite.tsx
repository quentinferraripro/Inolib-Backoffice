import {
  createContext,
  useContext,
  useEffect,
  useId,
  useReducer,
  type HTMLAttributes,
  type PropsWithChildren,
  type RefObject,
} from "react";

import { useDidUpdateEffect } from "../hooks/useDidUpdateEffect";

type AriaOrientation = Attributes["aria-orientation"];
type Attributes = HTMLAttributes<HTMLElement>;
type CompositeId = string;
type Composites = Record<CompositeId, Ref[]>;
type Index = number;
type Ref = RefObject<HTMLElement>;
type Role = Attributes["role"];

type Props = {
  readonly initialIndex?: Index | undefined;
  readonly onFocus?: (event: FocusEvent) => void | undefined;
  readonly orientation?: AriaOrientation;
  readonly role?: Role;
};

type State = {
  readonly id: CompositeId;
  readonly focusableIndex: Index;
  readonly orientation: NonNullable<AriaOrientation>;
};

class CompositeError extends Error {}

/** Context object containing the internal state of the {@linkcode Composite} component. */
const CompositeContext = createContext<State>({} as State);

/** Registry shared between all {@linkcode Composite} components. */
const composites: Composites = {};

/**
 * Returns a callback which adds a reference to a navigable descendant in the shared registry.
 *
 * @param id The id of the {@linkcode Composite} component.
 *
 * @returns The callback for the {@linkcode useComposite} hook.
 *
 * @see {@linkcode Composite} component
 * @see {@linkcode useComposite} hook
 */
const addRef = (id: CompositeId) => (ref: Ref) => {
  if (!composites[id].includes(ref)) {
    composites[id].push(ref);
  }
};

/**
 * Returns the default orientation for a given role.
 *
 * The following roles have an implicit `aria-orientation` value: `"listbox"`, `"menu"`, `"menubar"`, `"scrollbar"`,
 * `"separator"`, `"slider"`, `"tablist"`, `"toolbar"`, and `"tree"`.
 *
 * @param role The WAI-ARIA role.
 *
 * @returns `"horizontal"` or `"vertical"` if `role` has an implicit `aria-orientation` value, `undefined` otherwise.
 *
 * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-orientation}
 */
const defaultOrientation = (role: Role) => {
  switch (role) {
    case "menubar":
    case "separator":
    case "slider":
    case "tablist":
    case "toolbar": {
      return "horizontal";
    }

    case "listbox":
    case "menu":
    case "scrollbar":
    case "tree": {
      return "vertical";
    }
  }

  return undefined;
};

/**
 * Sets the browser focus on a navigable descendant.
 *
 * @param state The internal state of the {@linkcode Composite} component.
 * @param index The navigation index of the element.
 *
 * @see {@linkcode Composite} component
 */
const focus = (state: State, index: Index) => {
  for (let i = 0; i < composites[state.id].length; i++) {
    const element = composites[state.id][i].current;

    if (i === index) {
      element?.setAttribute("tabindex", "0");
      element?.focus();
    } else {
      element?.setAttribute("tabindex", "-1");
    }
  }
};

/**
 * Decrements the index of the focusable descendant.
 *
 * @param state The internal state of the {@linkcode Composite} component.
 *
 * @returns The updated internal state.
 *
 * @see {@linkcode Composite} component
 */
const decrementFocusableIndex = (state: State) => {
  if (state.focusableIndex > 0) {
    state = { ...state, focusableIndex: state.focusableIndex - 1 };
  }

  return state;
};

/**
 * Increments the index of the focusable descendant.
 *
 * @param state The internal state of the {@linkcode Composite} component.
 *
 * @returns The updated internal state.
 *
 * @see {@linkcode Composite} component
 */
const incrementFocusableIndex = (state: State) => {
  if (state.focusableIndex < composites[state.id].length - 1) {
    state = { ...state, focusableIndex: state.focusableIndex + 1 };
  }

  return state;
};

/**
 * Handles mouse on `click` and keyboard navigation on `keydown`.
 *
 * @param state The internal state of the {@linkcode Composite} component.
 * @param event The dispatched event object.
 *
 * @returns The updated internal state.
 *
 * @see {@linkcode Composite} component
 * @see {@link https://developer.mozilla.org/docs/Web/API/KeyboardEvent}
 * @see {@link https://developer.mozilla.org/docs/Web/API/MouseEvent}
 */
const reducer = (state: State, event: KeyboardEvent | MouseEvent) => {
  switch (event.type) {
    case "click": {
      state = { ...state, focusableIndex: composites[state.id].findIndex((ref) => ref.current === event.target) };
      break;
    }

    case "keydown": {
      switch (state.orientation) {
        case "horizontal": {
          switch ((event as KeyboardEvent).code) {
            case "ArrowLeft": {
              state = decrementFocusableIndex(state);
              break;
            }

            case "ArrowRight": {
              state = incrementFocusableIndex(state);
              break;
            }
          }
          break;
        }

        case "vertical": {
          switch ((event as KeyboardEvent).code) {
            case "ArrowDown": {
              state = incrementFocusableIndex(state);
              break;
            }

            case "ArrowUp": {
              state = decrementFocusableIndex(state);
              break;
            }
          }
          break;
        }
      }
      break;
    }
  }

  return state;
};

/**
 * Use this hook to add the ref of a navigable descendant in the shared registry.
 *
 * @example
 *   export const MyButton(({ children }) => {
 *     const { addRef } = useComposite();
 *     const ref = useRef<HTMLButtonElement>(null);
 *
 *     useEffect(() => {
 *       addRef(ref);
 *     }, [addRef]);
 *
 *     return <button ref={ref}>{children}</button>;
 *   });
 *
 * @returns An object providing `addRef`.
 */
export const useComposite = () => {
  const state = useContext(CompositeContext);

  return {
    addRef: addRef(state.id),
  };
};

/**
 * Use this component to handle mouse and keyboard navigation inside a composite widget.
 *
 * This component does not generate any element in the DOM.
 *
 * @example
 *   const reducer = (state, event) => {
 *     return { ...state, activeDescendant: event.target.id };
 *   };
 *
 *   const Item = ({ children }) => {
 *     const { addRef } = useComposite();
 *     const id = useId();
 *     const ref = useRef<HTMLButtonElement>(null);
 *
 *     useEffect(() => {
 *       addRef(ref);
 *     }, [addRef]);
 *
 *     return (
 *       <li role="none">
 *         <button id={id} ref={ref} role="menuitem">
 *           {children}
 *         </button>
 *       </li>
 *     );
 *   };
 *
 *   export const MyMenu = () => {
 *     const [state, dispatch] = useReducer(reducer, { activeDescendant: "" });
 *
 *     return (
 *       <ul aria-activedescendant={state.activeDescendant} aria-orientation="horizontal" role="menu">
 *         <Composite onFocus={dispatch} role="menu">
 *           <Item>Update</Item>
 *           <Item>Delete</Item>
 *         </Composite>
 *       </ul>
 *     );
 *   };
 *
 * @param props The props passed to the component.
 * @param props.children The children passed to the component.
 * @param props.initialIndex The position of the initially focusable descendant.
 * @param props.onFocus The callback function to be called when the focus is set on one of the navigable descendants.
 * @param props.orientation The value of the widget’s `aria-orientation` attribute.
 * @param props.role The value of the widget’s `role` attribute.
 *
 * @returns The JSX element to render.
 *
 * @throws A {@linkcode CompositeError} when `aria-orientation` is undefined and `role` does not have an implicit
 *   `aria-orientation` value.
 * @see {@link https://www.w3.org/TR/wai-aria-1.2/#aria-orientation}
 */
export const Composite = ({ children, initialIndex = 0, onFocus, orientation, role }: PropsWithChildren<Props>) => {
  const id = useId();

  orientation = orientation ?? defaultOrientation(role);

  if (orientation === undefined) {
    throw new CompositeError(
      "Cannot determine navigation orientation, 'aria-orientation' is undefined and 'role' does not have an implicit " +
        "'aria-orientation' value."
    );
  }

  const [state, dispatch] = useReducer(
    reducer,
    Object.freeze({
      id,
      focusableIndex: initialIndex,
      orientation,
    })
  );

  composites[id] ??= [];

  useEffect(() => {
    for (let i = 0; i < composites[id].length; i++) {
      const element = composites[id][i].current;

      element?.addEventListener("click", dispatch);
      element?.addEventListener("keydown", dispatch);

      if (onFocus !== undefined) {
        element?.addEventListener("focus", onFocus);
      }

      element?.setAttribute("tabindex", i === initialIndex ? "0" : "-1");
    }

    return () => {
      for (const ref of composites[id]) {
        const element = ref.current;

        element?.removeEventListener("click", dispatch);
        element?.removeEventListener("keydown", dispatch);

        if (onFocus !== undefined) {
          element?.removeEventListener("focus", onFocus);
        }
      }
    };
  }, [dispatch, id, initialIndex, onFocus]);

  useDidUpdateEffect(() => {
    focus(state, state.focusableIndex);
  }, [state]);

  return <CompositeContext.Provider value={state}>{children}</CompositeContext.Provider>;
};
