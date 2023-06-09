import { useId, type PropsWithChildren } from "react";
import { useState } from "react";

import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementTitle from "./ArticleManagementTitle";
import ArticleManagementCreationDate from "./ArticleManagementCreationDate";
import TestModal from "@components/TestModal";
import { Composite } from "../Composite";
import ArticleManagementContent from "./ArticleManagementContent";

type Props = {
  focusableIndex?: number;
  title: string;
  createdAt: string;
  content: string;
};

export default function ArticleManagementLine(props: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <ArticleManagementTitle title={props.title} styles="px-10 focus:bg-slate-400" />
      <ArticleManagementCreationDate creationDate={props.createdAt} styles="pr-10 focus:bg-slate-400" />
      <ArticleManagementContent content={props.content} styles="pr-10 focus:bg-slate-400" />
      <th>
        <Composite axis="horizontal" id={useId()} focusableIndex={props.focusableIndex ?? 0}>
          <ul aria-orientation="horizontal" className="flex" role="menu" tabIndex={-1}>
            <li role="none">
              <ArticleManagementButton styles="p-2 mx-4 bg-yellow-600 rounded-lg" title="modifier" index={0} />
            </li>
            <li role="none">
              <ArticleManagementButton
                styles="p-2 mx-4 bg-red-600 rounded-lg"
                title="supprimer"
                index={1}
                handleModal={handleModal}
              />
            </li>
          </ul>
        </Composite>
      </th>
      {open && (
        <TestModal open={open} onClose={handleCloseModal} title={props.title} styles="absolute top-1/2 left-1/4" />
      )}
    </>
  );
}
