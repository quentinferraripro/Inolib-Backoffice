import { type PropsWithChildren } from "react";

import { type OpenDeleteModal } from "./UserManagementModule";

import UserManagementLink from "./UserManagementLink";
import UserManagementButton from "./UserManagementButton";
import UserManagementFirstName from "./UserManagementFistName";
import UserManagementLastname from "./UserManagementLastName";
import UserManagementEmail from "./UserManagementEmail";
import UserManagementPhone from "./UserManagementPhone";
import UserManagementPassword from "./UserManagementPassword";
import UserManagementAdmin from "./UserManagementAdmin";

type Props = {
  cuid: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isAdmin: boolean;
  password: string;
  openDeleteModal: OpenDeleteModal;
};

export default function UserManagementLine(props: PropsWithChildren<Props>) {
  const handleKeyUp: React.KeyboardEventHandler<HTMLAnchorElement | HTMLButtonElement> = (event) => {
    if (event.code === "Escape") {
      // Déplacer le focus vers l'élément parent <tr>
      const tr = (event.currentTarget as HTMLElement | null)?.parentElement?.parentElement;
      tr?.focus();
    }
  };

  return (
    <tr className="flex border-y-[1px] border-t-black w-[100vw]" tabIndex={0}>
      <>
        <UserManagementFirstName
          firstName={props.firstName}
          styles="py-2 focus:bg-slate-400 w-[14%] flex justify-center items-center"
        />
        <UserManagementLastname
          lastName={props.lastName}
          styles=" focus:bg-slate-400 w-[14%] flex items-center justify-center truncate ..."
        />
        <UserManagementEmail email={props.email} styles="focus:bg-slate-400 w-[14%] flex items-center justify-center" />
        <UserManagementPhone phone={props.phone} styles="focus:bg-slate-400 w-[14%] flex items-center justify-center" />
        <UserManagementAdmin
          isAdmin={props.isAdmin}
          styles="focus:bg-slate-400 w-[14%] flex items-center justify-center"
        />
        <UserManagementPassword
          password={props.password}
          styles="focus:bg-slate-400 w-[14%] flex items-center justify-center"
        />
        <td className="w-[14%] flex items-center justify-center">
          <UserManagementLink
            cuid={props.cuid}
            className="p-2 mx-4 bg-yellow-600 rounded-lg "
            aria-label={`Modifier ${props.firstName} ${props.lastName}`}
            onKeyUp={handleKeyUp}
          >
            Modifier
          </UserManagementLink>

          <UserManagementButton
            onClick={() => void props.openDeleteModal(props.cuid, props.firstName)}
            className="p-2 mx-4 bg-red-600 rounded-lg"
            aria-label={`Supprimer ${props.firstName} ${props.lastName}`}
            onKeyUp={handleKeyUp}
          >
            Supprimer
          </UserManagementButton>
        </td>
      </>
    </tr>
  );
}
