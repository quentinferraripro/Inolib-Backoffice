type creationDateProps = {
  styles: string;
  creationDate: string;
};

export default function ArticleManagementcreationDate(props: creationDateProps) {
  return (
    <th className="pr-10 flex justify-center items-center" scope="col">
      {props.creationDate}
    </th>
  );
}
