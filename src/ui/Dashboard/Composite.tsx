import {
  createContext,
  useContext,
  useEffect,
  type Dispatch,
  type KeyboardEvent,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { useImmerReducer } from "use-immer";

export type Axis = "horizontal" | "vertical";
type ContextId = string;
type Focusables = Record<Index, Ref>;
export type Index = number;
type Ref = RefObject<HTMLElement>;

type DispatchFunction = Dispatch<KeyboardEvent>;
type RegisterFunction = (id: ContextId, index: Index, ref: Ref) => void;

type Props = {
  readonly axis?: Axis | undefined;
  readonly focusableIndex?: Index | undefined;
  readonly id: ContextId;
};

type State = {
  readonly axis: NonNullable<Props["axis"]>;
  focusables: Focusables;
  focusableIndex: NonNullable<Props["focusableIndex"]>;
  readonly id: ContextId;
};

type Store = Record<ContextId, Focusables>;

const store: Store = {};

//Gestion du passage du focus par changement du tabindex
const focus = (draft: State, index: Index) => {
  Object.values(draft.focusables).forEach((_ref, _index) => {
    const element = _ref.current;

    if (_index === index) {
      element?.setAttribute("tabindex", "0");
      element?.focus();
    } else {
      element?.setAttribute("tabindex", "-1");
    }
  });

  return draft;
};

//gestion du focus au prochain élément si est dans le tableau
const focusNext = (draft: State) => {
  if (draft.focusableIndex < Object.keys(draft.focusables).length - 1) {
    return focus(draft, ++draft.focusableIndex);
  }

  return draft;
};

//gestion focus élément précédent
const focusPrevious = (draft: State) => {
  if (draft.focusableIndex > 0) {
    return focus(draft, --draft.focusableIndex);
  }
  return draft;
};

//gestion des touches est appelée par la fonction dispatch
const reducer = (draft: State, event: KeyboardEvent) => {
  if (Object.keys(draft.focusables).length === 0) {
    draft.focusables = store[draft.id];
  }
  switch (draft.axis) {
    case "horizontal": {
      switch (event.code) {
        case "ArrowLeft": {
          return focusPrevious(draft);
        }

        case "ArrowRight": {
          return focusNext(draft);
        }
      }
      break;
    }

    case "vertical": {
      switch (event.code) {
        case "ArrowDown": {
          return focusNext(draft);
        }

        case "ArrowUp": {
          return focusPrevious(draft);
        }
      }
      break;
    }
  }

  return draft;
};

//register: pour enregistrer une référence d'un élément dans un objet "Store"
const register: RegisterFunction = (id, index, ref) => {
  store[id][index] ??= ref;
};

//création des 3 context
// eslint-disable-next-line @typescript-eslint/no-empty-function
const DispatchContext = createContext<DispatchFunction>(() => {});
const RegisterContext = createContext(register);
const StateContext = createContext<State>({} as State);

//costum hook contenant les contexts

export const useComposite = () => {
  return {
    dispatch: useContext(DispatchContext),
    register: useContext(RegisterContext),
    state: useContext(StateContext),
  };
};

export const Composite = (props: PropsWithChildren<Props>) => {
  const focusableIndex = props.focusableIndex ?? 0;

  const [state, dispatch] = useImmerReducer(reducer, {
    axis: props.axis ?? "vertical",
    focusables: {},
    focusableIndex,
    id: props.id,
  });

  store[props.id] ??= {};

  useEffect(() => {
    Object.values(store[props.id]).forEach((ref, index) => {
      ref.current?.setAttribute("tabindex", index === focusableIndex ? "0" : "-1");
    });
  }, [focusableIndex, props.id]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <RegisterContext.Provider value={register}>
        <StateContext.Provider value={state}>{props.children}</StateContext.Provider>
      </RegisterContext.Provider>
    </DispatchContext.Provider>
  );
};
