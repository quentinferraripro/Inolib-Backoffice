import ArticleManagementLine from "./ArticleManagementLine";
import { useQuery, gql } from "@apollo/client";

type Data = {
  documents: Document[];
};

type Document = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const GET_ARTICLE_DATA = gql`
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
  const { data, error, loading } = useQuery<Data>(GET_ARTICLE_DATA);

  return (
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
                  <tr key={document.id} className="flex border-y-[1px] border-t-black w-[100vw] justify-around">
                    <ArticleManagementLine
                      cuid={document.id}
                      title={document.title}
                      createdAt={document.createdAt}
                      content={document.content}
                    />
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </div>
  );
}
