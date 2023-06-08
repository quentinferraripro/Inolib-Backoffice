import { useId, type PropsWithChildren } from "react";
import React, { useState } from "react";
import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementTabTitle from "./ArticleManagementTabTitle";
import ArticleManagementTabCreation from "./ArticleManagementTabCreation";
import TestModal from "@components/TestModal";
import { Composite } from "../Composite";

type Props = {
  focusableIndex?: number;
  title: string;
  creationDate: number;
};

export default function ArticleManagementTabList(props: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  return (
    <>
      <ArticleManagementTabTitle title={props.title} styles="px-10 focus:bg-slate-400" />
      <ArticleManagementTabCreation creationDate={props.creationDate} styles="pr-10 focus:bg-slate-400" />
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
      {open && <TestModal open={open} onClose={handleCloseModal} title={props.title} />}
    </>
  );
}
