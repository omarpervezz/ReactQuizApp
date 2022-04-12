/* eslint-disable react-hooks/rules-of-hooks */
import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Answers from "../components/Answers";
import { authUser } from "../components/AuthProvider";
import useQuizList from "../components/customhooks/useQuizList";
import MiniPlayer from "../components/MiniPlayer";
import ProgressBar from "../components/ProgressBar";

const initialState = null;

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuizList(id);

  // eslint-disable-next-line no-unused-vars
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentuser } = authUser();
  const history = useHistory();
  const { location } = history;
  const { state } = location;
  const { videoTitle } = state;
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);
  function handleAnswerdChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  // increment value of question number for looping qna array
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((nextQ) => nextQ + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevQ) => prevQ - 1);
    }
  }
  async function submit() {
    const { uid } = currentuser;
    const db = getDatabase(); // database ref
    const resultRef = ref(db, `result/${uid}`);
    await set(resultRef, {
      [id]: qna,
    });
    history.push({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    });
  }

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerdChange}
          ></Answers>
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            percentage={percentage}
            submit={submit}
          ></ProgressBar>
          <MiniPlayer id={id} title={videoTitle}></MiniPlayer>
        </>
      )}
    </>
  );
}
