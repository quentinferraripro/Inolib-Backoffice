import ArticleManagementLine from "./ArticleManagementLine";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

type Data = {
  documents: Document[];
};

type Document = {
  id?: string;
  title?: string;
  content?: string;
  createdAt?: string;
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
  const { id } = useParams();
  return (
    <>
      {error !== undefined ? (
        <p>{error.message}</p>
      ) : loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full">
          <tbody>
            {data !== undefined
              ? data.documents.map((document) => (
                  <tr key={document.id} className="flex border-y-[1px] border-t-black">
                    <ArticleManagementLine
                      cuid={document.id}
                      title={document.title}
                      createdAt={document.createdAt}
                      content={document.content}
                      id={id}
                    />
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      )}
    </>
  );
}
