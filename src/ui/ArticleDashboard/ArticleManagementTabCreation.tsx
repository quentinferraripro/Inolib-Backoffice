import { useEffect, useRef, type PropsWithChildren } from "react";
import { useComposite } from "../Composite";

type CreationProps = {
  styles: string;
  creationDate: number;
  index: number;
};

export default function ArticleManagementTabCreation(props: PropsWithChildren<CreationProps>) {
  const { register, state } = useComposite();
  const ref = useRef<HTMLButtonElement>();

  useEffect(() => {
    register(state.id, props.index, ref);
  }, [register, state.id, props.index]);
  return (
    <th className="pr-10" scope="col">
      {props.creationDate}
    </th>
  );
}
