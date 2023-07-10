type FirstNameProps = {
  styles: string;
  firstName: string;
};

export default function UserManagementFirstName(props: FirstNameProps) {
  return <td className={props.styles}>{props.firstName}</td>;
}
