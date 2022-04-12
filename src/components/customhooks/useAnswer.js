import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswer(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    async function fetchAnswer() {
      const db = getDatabase(); // database reference
      const answerRef = ref(db, "answers/" + videoID + "/questions");
      const answerQuery = query(answerRef, orderByKey());
      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswer((prevAnswer) => {
            return [...prevAnswer, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log("there was an erro");
        setLoading(false);
        setError(true);
      }
    }

    fetchAnswer();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
