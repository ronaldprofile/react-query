import { useEffect, useState } from "react";
import styles from "./App.module.scss";

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

export function App() {
  const [currentUserId, setCurrentUserId] = useState(1);
  const [user, setUser] = useState<IData>();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(currentUserId)
      .then(response => {
        setUser(response);
        setIsLoading(false);
      })
      .catch(error => {
        setIsError(true);
        setIsLoading(false);

        console.log("aconteceu um erro :( " + error);
      });
  }, [currentUserId]);

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
      <img src={user.avatar} alt={user.first_name} />

      <strong className={styles.userName}>
        {user.first_name} {user.last_name} ({user.id})
      </strong>

      <p>E-mail: {user.email}</p>

      <div className={styles.buttons}>
        <button onClick={handlePrevUser}>Prev</button>
        <button onClick={handleNextUser}>Next</button>
      </div>
    </section>
  );
}
