type creationDateProps = {
  createdAt: string;
  styles: string;
};

export default function ArticleManagementcreationDate(props: creationDateProps) {
  const showedDate = props.createdAt.slice(0, 10);
  return <td className={props.styles}>{showedDate}</td>;
}
