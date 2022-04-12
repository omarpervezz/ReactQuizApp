import {
  get,
  getDatabase,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAt,
} from "firebase/database";
import { useEffect, useState } from "react";

export default function useListHook(page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasmore] = useState(true);

  useEffect(() => {
    async function getDataFromFirebase() {
      const db = getDatabase(); // database reference
      const videoreference = ref(db, "videos");
      const videoquery = query(
        videoreference,
        orderByKey(),
        startAt("" + page),
        limitToFirst(8)
      );

      try {
        setError(false);
        setLoading(true);
        const snapshot = await get(videoquery);
        if (snapshot.exists()) {
          setVideos((prevVidoes) => {
            return [...prevVidoes, ...Object.values(snapshot.val())];
          });
        } else {
          setHasmore(false);
          setLoading(false);
        }
      } catch (err) {
        console.log("there was an erro");
        setLoading(false);
        setError(true);
      }
    }

    getDataFromFirebase();
  }, [page]);

  return {
    loading,
    error,
    videos,
    hasMore,
  };
}
