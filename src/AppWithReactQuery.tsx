import { useState } from "react";
import styles from "./App.module.scss";

import { useQuery } from "react-query";
import { MdEmail } from "react-icons/md";

interface IData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

async function getUser(id: number) {
  const url = `https://reqres.in/api/users/${id}?delay=1`;

  const request = await fetch(url);
  const response = await request.json();

  if (!request.ok) {
    throw new Error(response.error);
  }

  return response.data as IData;
}

export function AppWithReactQuery() {
  const [currentUserId, setCurrentUserId] = useState(1);

  const {
    data: user,
    isError,
    isLoading
  } = useQuery(["users", currentUserId], () => getUser(currentUserId));

  function handleNextUser() {
    setCurrentUserId(currentUserId + 1);
  }

  function handlePrevUser() {
    setCurrentUserId(currentUserId - 1);
  }

  if (isError) {
    return (
      <section className={styles.sectionContainer}>
        <strong>Something went wrong</strong>
      </section>
    );
  }

  if (!user || isLoading) {
    return (
      <section className={styles.sectionContainer}>
        <h3>Loading...</h3>
      </section>
    );
  }

  return (
    <section className={styles.sectionContainer}>
      <div className={styles.userCard}>
        <img
          src={user.avatar}
          alt={user.first_name}
          className={styles.userAvatar}
        />

        <strong className={styles.userName}>
          {user.first_name} {user.last_name}
        </strong>

        <span className={styles.userEmail}>
          <MdEmail size={20} />
          <p>{user.email}</p>
        </span>

        <div className={styles.buttons}>
          <button onClick={handlePrevUser}>Prev</button>
          <button onClick={handleNextUser}>Next</button>
        </div>
      </div>
    </section>
  );
}
