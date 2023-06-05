import { type PropsWithChildren } from "react";

import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementTabTitle from "./ArticleManagementTabTitle";
import ArticleManagementTabCreation from "./ArticleManagementTabCreation";

type Props = {
  index: number;
  title: string;
  creationDate: number;
};

export default function ArticleManagementTabList(props: PropsWithChildren<Props>) {
  return (
    <>
      <ArticleManagementTabTitle title={props.title} styles="px-10 focus:bg-slate-400" index={0} />
      <ArticleManagementTabCreation creationDate={props.creationDate} styles="pr-10 focus:bg-slate-400" index={1} />
      <th>
        <ArticleManagementButton styles="p-2 mx-4 bg-yellow-600 rounded-lg" title="modifier" index={0} />
        <ArticleManagementButton styles="p-2 mx-4 bg-red-600 rounded-lg" title="supprimer" index={1} />
      </th>
    </>
  );
}
