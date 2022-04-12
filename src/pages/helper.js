import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Answers from "../components/Answers";
import useQuiz from "../components/customhooks/useQuiz";
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
    case "answers":
      const question = _.cloneDeep(state);
      question[action.questionId].options[action.optionIndex] = action.type;
      return question;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, error, questions } = useQuiz(id);
  // eslint-disable-next-line no-unused-vars
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);
  function handleAnswerdChange(e, index) {
    dispatch({
      type: "answers",
      questionId: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div>There was an error</div>}
      {!loading && !error && qna && qna.length > 0 ? (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <button type="button">increment your value</button>
          <Answers
            options={qna[currentQuestion].options}
            handleChange={handleAnswerdChange}
          ></Answers>
          <ProgressBar></ProgressBar>
          <MiniPlayer></MiniPlayer>
        </>
      ) : (
        <div>Sorry we don't get anything to give you right now</div>
      )}
    </>
  );
}
