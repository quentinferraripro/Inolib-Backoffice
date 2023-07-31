import { type PropsWithChildren } from "react";

import { Composite } from "../Composite";
import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementContent from "./ArticleManagementContent";
import ArticleManagementCreationDate from "./ArticleManagementCreationDate";
import ArticleManagementLink from "./ArticleManagementLink";
import { type OpenDeleteModal } from "./ArticleManagementModule";
import ArticleManagementTitle from "./ArticleManagementTitle";

type Props = {
  content: string;
  createdAt: string;
  cuid: string;
  openDeleteModal: OpenDeleteModal;
  title: string;
};

export default function ArticleManagementLine(props: PropsWithChildren<Props>) {
  const title = props.title !== undefined ? props.title : "";
  const content = props.content !== undefined ? props.content : "";

  const nohtmlTitle = title?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlContent = content?.replace(/(<([^>]+)>)/gi, "");

  return (
    <tr className="flex border-y-[1px] border-t-black w-[100vw] justify-around">
      <>
        <ArticleManagementTitle
          title={nohtmlTitle}
          styles="focus:bg-slate-400 w-1/4 flex justify-center items-center"
        />
        <ArticleManagementContent
          content={nohtmlContent}
          styles="focus:bg-slate-400 w-1/4 flex items-center justify-center truncate ..."
        />
        <ArticleManagementCreationDate
          createdAt={props.createdAt}
          styles="focus:bg-slate-400 w-1/4 flex justify-center items-center"
        />
        {/* <Composite orientation="vertical"> */}
        <td className="focus:bg-slate-400 w-1/4 flex justify-center items-center">
          <ArticleManagementLink cuid={props.cuid} title={nohtmlTitle} styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
            Modifier
          </ArticleManagementLink>
        </td>
        <td>
          <ArticleManagementButton
            onClick={() => void props.openDeleteModal(props.cuid, nohtmlTitle)}
            styles="p-2 mx-4 bg-red-600 rounded-lg"
            title={nohtmlTitle}
          >
            Supprimer
          </ArticleManagementButton>
        </td>
        {/* </Composite> */}
      </>
    </tr>
  );
}
