type AdminProps = {
  styles: string;
  isAdmin: boolean;
};

export default function UserManagementAdmin(props: AdminProps) {
  return <td className={props.styles}> {props.isAdmin ? "Admin" : "Utilisateur"}</td>;
}
