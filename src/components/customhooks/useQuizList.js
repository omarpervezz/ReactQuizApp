import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuizList(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    async function getDataFromFirebase() {
      const db = getDatabase(); // database reference
      const quizref = ref(db, "quiz/" + videoID + "/questions");
      const quizquery = query(quizref, orderByKey());
      try {
        setError(false);
        setLoading(true);

        const snapshot = await get(quizquery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestion((prevQuestions) => {
            return [...prevQuestions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log("there was an erro");
        setLoading(false);
        setError(true);
      }
    }

    getDataFromFirebase();
  }, [videoID]);

  return {
    loading,
    error,
    questions,
  };
}
