type LastNameProps = {
  styles: string;
  lastName: string;
};

export default function UserManagementLastname(props: LastNameProps) {
  return <td className={props.styles}>{props.lastName}</td>;
}
