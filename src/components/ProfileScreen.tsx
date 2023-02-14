import { type NextPage } from "next";
import type { User } from "@prisma/client";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "../utils/api";

const ProfileScreen: NextPage = () => {
  const [displayName, setDisplayName] = useState<string | null>(null);

  const updateDisplayName = api.user.updateName.useMutation();

  api.user.getUser.useQuery(undefined, {
    onSuccess(userData: User) {
      console.log(userData);
      setDisplayName(userData?.name);
    },
  });

  return (
    <>
      <form onSubmit={() => console.log("submitted")}>
        <label htmlFor="displayName">
          Display Name:
          <input id="displayName" name="displayName" />
        </label>
        <label htmlFor="email">
          Email:
          <input id="email" name="email" />
        </label>
      </form>
    </>
  );
};

export default ProfileScreen;
