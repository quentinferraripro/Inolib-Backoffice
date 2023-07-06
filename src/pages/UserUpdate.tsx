import "react-quill/dist/quill.snow.css";

import { gql, useMutation, useQuery } from "@apollo/client";
import { nanoid } from "nanoid";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useParams } from "react-router-dom";

import UserUpdateModal from "../ui/UserDashboard/UserUpdateModal";

type Data = {
  findUser: User[];
};

type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
};

export default function UserUpdate() {
  const { id } = useParams();
  const USER = gql`
    query findUser($id: Cuid!) {
      findUser(id: $id) {
        id
        firstName
        lastName
        email
        phone
        password
      }
    }
  `;

  // requete UPDATE
  const UPDATE_USER = gql`
    mutation updateUser(
      $id: Cuid!
      $firstName: String!
      $lastName: String!
      $email: String!
      $phone: String!
      $password: String!
    ) {
      updateDocument(
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        password: $password
      ) {
        id
        firstName
        lastName
        email
        phone
        password
      }
    }
  `;

  const { data, error, loading } = useQuery<Data>(USER, {
    variables: {
      id,
    },
  });

  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      const response = await updateUser({
        variables: {
          id,
          firstName,
          lastName,
          email,
          phone,
          password,
        },
      });

      window.location.reload();
      console.log(response);
    })();
  };

  const [updateUser] = useMutation(UPDATE_USER);

  //gestion de la modale
  // const [open, setOpen] = useState(false);
  // const handleCloseModal = () => setOpen(false);
  // const handleOpenModal = () => setOpen(true);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFirstName = (firstNameValue: string) => {
    setFirstName(firstNameValue);
  };
  const handleLastName = (lastNameValue: string) => {
    setLastName(lastNameValue);
  };
  const handleEmail = (emailValue: string) => {
    setEmail(emailValue);
  };
  const handlePhone = (phoneValue: string) => {
    setPhone(phoneValue);
  };
  const handlePassword = (passwordValue: string) => {
    setPassword(passwordValue);
  };

  useEffect(() => {
    if (data?.findUser[0]) {
      setFirstName(data?.findUser[0].firstName || "");
      setLastName(data?.findUser[0].lastName || "");
      setEmail(data?.findUser[0].email || "");
      setPhone(data?.findUser[0].phone || "");
      setPassword(data?.findUser[0].password || "");
    }
  }, [data?.findUser]);
  console.log(data);
  return (
    <>
      {error !== undefined ? (
        <p>{error.message}</p>
      ) : loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="mx-28 mt-10 text-[#0B3168]">
          {data !== undefined ? (
            <>
              <header>
                <h1 className="text-3xl font-bold underline mb-10">Modifier les donnée de l'utilisateur</h1>
              </header>
              <form onSubmit={handleUpdate}>
                <label className="text-xl² mb-5 font-bold">
                  Prénom
                  <input value={firstName} onChange={handleFirstName} />
                </label>
                <label className="text-xl² my-16 font-bold">
                  Nom
                  <input value={lastName} onChange={handleLastName} />
                </label>
                <label className="text-xl² my-16 font-bold" type="email">
                  Email
                  <input value={email} onChange={handleEmail} />
                </label>
                <label className="text-xl² my-16 font-bold">
                  Téléphone
                  <input value={phone} onChange={handlePhone} />
                </label>
                <label className="text-xl² my-16 font-bold">
                  mot de passe
                  <input value={password} onChange={handlePassword} />
                </label>
                <div className="my-16"></div>
                <button /*onClick={handleOpenModal}*/ type="button">Valider</button>
                {/* {open && (
                  <UserUpdateModal
                    firstName={firstname}
                    open={open}
                    titleCloseButton="Fermer"
                    titleCreateButton="Mettre à jour"
                    styles="absolute top-1/2 left-1/2"
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                  />
                )} */}
              </form>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
