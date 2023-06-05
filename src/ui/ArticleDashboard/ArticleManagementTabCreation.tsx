type CreationProps = {
  styles: string;
  creationDate: number;
};

export default function ArticleManagementTabCreation(props: CreationProps) {
  return (
    <th className="pr-10" scope="col">
      {props.creationDate}
    </th>
  );
}
