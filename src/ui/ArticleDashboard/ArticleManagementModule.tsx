import ArticleManagementLine from "./ArticleManagementLine";
import { useQuery, gql } from "@apollo/client";

const GET_ARTICLE_DATA = gql`
  query GetArticleData {
    documents {
      title
      content
      createdAt
    }
  }
`;

export default function ArticleManagementModule() {
  const result = useQuery(GET_ARTICLE_DATA);

  console.log(result);

  return (
    <table className="w-full">
      <tbody>
        {result.data.documents.map((document) => (
          <tr key={document.id} className="flex border-y-[1px] border-t-black">
            <ArticleManagementLine title={document.title} createdAt={document.createdAt} content={document.content} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
