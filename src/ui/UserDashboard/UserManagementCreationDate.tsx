type creationDateProps = {
  createdAt: string;
};

export default function UserManagementcreationDate(props: creationDateProps) {
  const showedDate = props.createdAt.slice(0, 10);
  return <td className="pr-10 flex justify-center items-center">{showedDate}</td>;
}
