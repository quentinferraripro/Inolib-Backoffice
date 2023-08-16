import { type PropsWithChildren } from "react";

// import { Composite } from "../Composite";
import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementContent from "./ArticleManagementContent";
import ArticleManagementCreationDate from "./ArticleManagementCreationDate";
import ArticleManagementDescription from "./ArticleManagementDescription";
import ArticleManagementLink from "./ArticleManagementLink";
import { type OpenDeleteModal } from "./ArticleManagementModule";
import ArticleManagementTitle from "./ArticleManagementTitle";

type Props = {
  content: string;
  createdAt: string;
  cuid: string;
  description: string;
  openDeleteModal: OpenDeleteModal;
  title: string;
};

export default function ArticleManagementLine(props: PropsWithChildren<Props>) {
  const title = props.title ?? "";
  const content = props.content ?? "";
  const description = props.description ?? "";
  const nohtmlDescription = description?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlTitle = title?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlContent = content?.replace(/(<([^>]+)>)/gi, "");

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      // Déplacer le focus vers l'élément parent <tr>
      const tr = (event.currentTarget as HTMLElement | null)?.parentElement?.parentElement;
      tr?.focus();
    }
  };

  return (
    <tr className="flex border-y-[1px] border-t-black w-[100vw] justify-around" tabIndex={0}>
      <>
        <ArticleManagementTitle
          title={nohtmlTitle}
          styles="focus:bg-slate-400 w-1/6 flex justify-center items-center"
        />
        <ArticleManagementContent
          content={nohtmlContent}
          styles="focus:bg-slate-400 w-1/6 flex items-center justify-center truncate ..."
        />
        <ArticleManagementDescription
          description={nohtmlDescription}
          styles="focus:bg-slate-400 w-1/6 flex justify-center items-center"
        />
        <ArticleManagementCreationDate
          createdAt={props.createdAt}
          styles="focus:bg-slate-400 w-1/6 flex justify-center items-center"
        />
        {/* <Composite orientation="vertical"> */}
        <td className="focus:bg-slate-400 w-1/6 flex justify-center items-center">
          <ArticleManagementLink
            aria-label={`Modifier ${nohtmlTitle}`}
            className="p-2 mx-4 bg-yellow-600 rounded-lg"
            cuid={props.cuid}
            onKeyUp={handleKeyUp}
          >
            Modifier
          </ArticleManagementLink>
        </td>
        <td className="focus:bg-slate-400 w-1/6 flex justify-center items-center">
          <ArticleManagementButton
            aria-label={`Supprimer ${nohtmlTitle}`}
            className="p-2 mx-4 bg-red-600 rounded-lg"
            onClick={() => void props.openDeleteModal(props.cuid, nohtmlTitle)}
            onKeyUp={handleKeyUp}
          >
            Supprimer
          </ArticleManagementButton>
        </td>
        {/* </Composite> */}
      </>
    </tr>
  );
}
