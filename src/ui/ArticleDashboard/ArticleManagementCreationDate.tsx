type creationDateProps = {
  createdAt: string;
};

export default function ArticleManagementcreationDate(props: creationDateProps) {
  const showedDate = props.createdAt.slice(0, 10);
  return (
    <th className="pr-10 flex justify-center items-center" scope="col">
      {showedDate}
    </th>
  );
}
