import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

import ArticleManagementLine from "./ArticleManagementLine";
import DeleteModal from "./DeleteModal";

type DeleteArticleData = {
  deleteDocument: {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: string;
  };
};

type GetArticleData = {
  documents: Document[];
};

type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type OpenDeleteModal = (cuid: string, title: string) => void;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Cuid!) {
    deleteDocument(id: $id) {
      id
    }
  }
`;

export const GET_ARTICLE_DATA = gql`
  query GetArticleData {
    documents {
      id
      title
      content
      createdAt
    }
  }
`;

export default function ArticleManagementModule() {
  const [deleteModalState, setDeleteModalState] = useState({
    cuid: "",
    isOpen: false,
    title: "",
  });

  const { data, error, loading } = useQuery<GetArticleData>(GET_ARTICLE_DATA);
  const [deleteArticle] = useMutation<DeleteArticleData>(DELETE_ARTICLE);

  const handleDeleteModalClose = () => {
    setDeleteModalState({ ...deleteModalState, isOpen: false });
  };

  const handleDeleteModalDelete = async () => {
    const response = await deleteArticle({
      variables: {
        id: deleteModalState.cuid,
      },
    });

    window.location.reload();
    console.log(response);
  };

  const openDeleteModal: OpenDeleteModal = (cuid, title) => {
    setDeleteModalState({ ...deleteModalState, cuid, isOpen: true, title });
  };

  return (
    <>
      <div className="mt-10">
        {error !== undefined ? (
          <p>{error.message}</p>
        ) : loading ? (
          <p>Chargement...</p>
        ) : (
          <table className="border-y-2 border-y-black">
            <caption className="text-2xl font-bold mb-6 ">Tableau de gestion des documents</caption>
            <thead className="border-b-2 border-b-black">
              <tr className="flex border-y-[1px] border-t-black w-full justify-around items-center">
                <th className="px-10 py-2">Titre</th>
                <th className="ml-16">Contenu</th>
                <th>Date de création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data !== undefined
                ? data.documents.map((document) => (
                    <ArticleManagementLine
                      key={document.id}
                      cuid={document.id}
                      title={document.title}
                      createdAt={document.createdAt}
                      content={document.content}
                      openDeleteModal={openDeleteModal}
                    />
                  ))
                : null}
            </tbody>
          </table>
        )}
      </div>

      {deleteModalState.isOpen && (
        <DeleteModal
          open={deleteModalState.isOpen}
          title={deleteModalState.title}
          titleCloseButton="Fermer"
          titleDeleteButton="Supprimer"
          styles="absolute top-1/2 left-1/4"
          onClose={handleDeleteModalClose}
          onDelete={() => void (async () => await handleDeleteModalDelete())()}
        />
      )}
    </>
  );
}
