import { type PropsWithChildren } from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Composite } from "../Composite";
import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementContent from "./ArticleManagementContent";
import ArticleManagementCreationDate from "./ArticleManagementCreationDate";
import ArticleManagementLink from "./ArticleManagementLink";
import ArticleManagementTitle from "./ArticleManagementTitle";
import DeleteModal from "./DeleteModal";

type Data = {
  deleteDocument: {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: string;
  };
};

type Props = {
  focusableIndex?: number;
  cuid: string;
  title: string;
  createdAt: string;
  content: string;
  id?: string;
};

export default function ArticleManagementLine(props: PropsWithChildren<Props>) {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  const DELETE_ARTICLE = gql`
    mutation DeleteArticle($id: Cuid!) {
      deleteDocument(id: $id) {
        id
      }
    }
  `;
  const title = props.title !== undefined ? props.title : "";
  const content = props.content !== undefined ? props.content : "";

  const [deleteArticle, { error, loading }] = useMutation<Data>(DELETE_ARTICLE);
  const nohtmlTitle = title?.replace(/(<([^>]+)>)/gi, "");
  const nohtmlContent = content?.replace(/(<([^>]+)>)/gi, "");

  const handleDelete = async () => {
    const response = await deleteArticle({
      variables: {
        id: props.cuid,
      },
    });
    window.location.reload();
    console.log(response);
  };

  return (
    <>
      {error !== undefined ? (
        <p>{error.message}</p>
      ) : loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <ArticleManagementTitle
            title={nohtmlTitle}
            styles="px-10 py-2 focus:bg-slate-400 w-1/5 flex justify-center items-center"
          />
          <ArticleManagementContent
            content={nohtmlContent}
            styles="mr-10 focus:bg-slate-400 w-1/5 flex items-center  truncate ..."
          />
          <ArticleManagementCreationDate createdAt={props.createdAt} />
          <td>
            <Composite orientation="horizontal">
              <ArticleManagementLink cuid={props.cuid} styles="p-2 mx-4 bg-yellow-600 rounded-lg ">
                Modifier
              </ArticleManagementLink>

              <ArticleManagementButton onClick={handleOpenModal} styles="p-2 mx-4 bg-red-600 rounded-lg">
                Supprimer
              </ArticleManagementButton>
            </Composite>
          </td>
        </>
      )}
      {open && (
        <DeleteModal
          open={open}
          title={nohtmlTitle}
          titleCloseButton="Fermer"
          titleDeleteButton="Supprimer"
          styles="absolute top-1/2 left-1/4"
          onClose={handleCloseModal}
          onDelete={() => void (async () => await handleDelete())()}
        />
      )}
    </>
  );
}
