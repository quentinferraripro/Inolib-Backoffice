import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type TitleProps = {
  styles: string;
  title: string;
  index: number;
};

export default function ArticleManagementTabTitle(props: PropsWithChildren<TitleProps>) {
  const { register, state } = useComposite();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);
  return (
    <th className={props.styles} scope="col">
      {props.title}
    </th>
  );
}
