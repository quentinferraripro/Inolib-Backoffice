import { useId, type PropsWithChildren } from "react";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import ArticleManagementButton from "./ArticleManagementButton";
import ArticleManagementTitle from "./ArticleManagementTitle";
import ArticleManagementCreationDate from "./ArticleManagementCreationDate";
import DeleteModal from "./DeleteModal";
import { Composite } from "../Composite";
import ArticleManagementContent from "./ArticleManagementContent";

const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Cuid!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;

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
};

export default function ArticleManagementLine(props: PropsWithChildren<Props>) {
  const id = useId();
  const [deleteArticle, { data, error, loading }] = useMutation<Data>(DELETE_ARTICLE);
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);
  const nohtmlTitle = props.title.replace(/(<([^>]+)>)/gi, "");
  const nohtmlContent = props.content.replace(/(<([^>]+)>)/gi, "");

  const handleDelete = async () => {
    const response = await deleteArticle({
      variables: {
        id: props.cuid,
      },
    });
    window.location.reload(false);
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
          <ArticleManagementCreationDate creationDate={props.createdAt} styles=" py-2 pr-10 focus:bg-slate-400 w-1/5" />
          <ArticleManagementContent
            content={nohtmlContent}
            styles="pr-10 focus:bg-slate-400 w-1/5 flex items-center  truncate ..."
          />
          <th>
            <Composite axis="horizontal" id={id} focusableIndex={props.focusableIndex ?? 0}>
              <ul aria-orientation="horizontal" className="py-2 flex w-1/5" role="menu" tabIndex={-1}>
                <li role="none">
                  <ArticleManagementButton styles="p-2 mx-4 bg-yellow-600 rounded-lg " title="modifier" index={0} />
                </li>
                <li role="none">
                  <ArticleManagementButton
                    styles="p-2 mx-4 bg-red-600 rounded-lg"
                    title="supprimer"
                    index={1}
                    onClick={handleOpenModal}
                  />
                </li>
              </ul>
            </Composite>
          </th>
        </>
      )}
      {open && (
        <DeleteModal
          open={open}
          titleCloseButton="Fermer"
          titleDeleteButton="Supprimer"
          styles="absolute top-1/2 left-1/4"
          onClose={handleCloseModal}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
