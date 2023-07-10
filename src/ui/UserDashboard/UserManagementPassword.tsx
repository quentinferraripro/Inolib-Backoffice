type PasswordProps = {
  styles: string;
  password: string;
};

export default function UserManagementPassword(props: PasswordProps) {
  return <td className={props.styles}>{props.password}</td>;
}
