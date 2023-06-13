type creationDateProps = {
  styles: string;
  creationDate: number;
};

export default function ArticleManagementcreationDate(props: creationDateProps) {
  return (
    <th className="pr-10" scope="col">
      {props.creationDate}
    </th>
  );
}
