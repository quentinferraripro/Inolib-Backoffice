"use client";

import "react-quill/dist/quill.snow.css";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, type FormEvent } from "react";

import UserUpdateModal from "../../../ui/UserDashboard/UserUpdateModal";

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

type Props = {
  params: {
    id: string;
  };
};

const UserUpdate = ({ params }: Props) => {
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
      updateUser(
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
      id: params.id,
    },
  });

  const handleUpdate = (event: FormEvent) => {
    event.preventDefault();

    void (async () => {
      const response = await updateUser({
        variables: {
          id: params.id,
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

  // gestion de la modale
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
                <h1
                  className="text-3xl font-bold underline mb-4
                "
                >
                  Modifier les données de l&lsquo;utilisateur
                </h1>
              </header>
              <form className="flex flex-col" onSubmit={handleUpdate}>
                <label className="text-xl² mb-5 font-bold">
                  Prénom :
                  <input
                    className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                </label>
                <label className="text-xl² mb-5 font-bold">
                  Nom :
                  <input
                    className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                    value={lastName}
                    onChange={handleLastName}
                  />
                </label>
                <label className="text-xl² mb-5 font-bold">
                  Email :
                  <input
                    className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                    value={email}
                    onChange={handleEmail}
                    type="email"
                  />
                </label>
                <label className="text-xl² mb-5 font-bold">
                  Téléphone :
                  <input
                    className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                    value={phone}
                    onChange={handlePhone}
                  />
                </label>
                <label className="text-xl² mb-5 font-bold">
                  mot de passe :
                  <input
                    className="border-[1px] border-[#0B3168] rounded-md pl-2 ml-2"
                    value={password}
                    onChange={handlePassword}
                  />
                </label>
                <button
                  className="bg-[#0B3168] rounded-md px-8 py-4 text-white text-xl hover:scale-105 transition ease-in delay-75 w-24 flex justify-center"
                  onClick={handleOpenModal}
                  type="button"
                >
                  Valider
                </button>
                {open && (
                  <UserUpdateModal
                    firstName={firstName}
                    open={open}
                    titleCloseButton="Fermer"
                    titleCreateButton="Mettre à jour"
                    styles="absolute top-1/2 left-1/2"
                    onClose={handleCloseModal}
                    onUpdate={handleUpdate}
                  />
                )}
              </form>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default UserUpdate;
