"use client";

import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";

import ArticleManagementLine from "./ArticleManagementLine";
import DeleteModal from "./ArticleDeleteModal";

type DeleteArticleData = {
  deleteArticle: {
    id?: string;
    title?: string;
    content?: string;
    createdAt?: string;
  };
};

type GetArticleData = {
  articles: Article[];
};

type Article = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type OpenDeleteModal = (cuid: string, title: string) => void;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Cuid!) {
    deleteArticle(id: $id) {
      id
    }
  }
`;

export const GET_ARTICLE_DATA = gql`
  query GetArticleData {
    articles {
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
            <caption className="text-2xl font-bold mb-6 ">Tableau de gestion des Articles</caption>
            <thead className="border-b-2 border-b-black">
              <tr className="flex border-y-[1px] border-t-black w-full items-center">
                <th className="w-1/5 flex justify-center items-center">Titre</th>
                <th className="w-1/5 flex justify-center items-center">Contenu</th>
                <th className="w-1/5 flex justify-center items-center">Date de création</th>
                <th className="w-1/5 flex justify-center items-center">Modifier un utilisateur</th>
                <th className="w-1/5 flex justify-center items-center">Supprimer un utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {data !== undefined
                ? data.articles.map((article) => (
                    <ArticleManagementLine
                      key={article.id}
                      cuid={article.id}
                      title={article.title}
                      createdAt={article.createdAt}
                      content={article.content}
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
          styles="absolute top-1/2 bg-red-700 text-white text-2xl h-[16rem] w-auto p-4 rounded-lg flex flex-col items-center justify-center"
          onClose={handleDeleteModalClose}
          onDelete={() => void (async () => await handleDeleteModalDelete())()}
        />
      )}
    </>
  );
}
