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

  const handleDelete = async () => {
    setOpen(true);

    const response = await deleteArticle({
      variables: {
        id: props.cuid,
      },
    });

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
          <ArticleManagementTitle title={props.title} styles="px-10 focus:bg-slate-400" />
          <ArticleManagementCreationDate creationDate={props.createdAt} styles="pr-10 focus:bg-slate-400" />
          <ArticleManagementContent content={props.content} styles="pr-10 focus:bg-slate-400" />
          <th>
            <Composite axis="horizontal" id={id} focusableIndex={props.focusableIndex ?? 0}>
              <ul aria-orientation="horizontal" className="flex" role="menu" tabIndex={-1}>
                <li role="none">
                  <ArticleManagementButton styles="p-2 mx-4 bg-yellow-600 rounded-lg" title="modifier" index={0} />
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
