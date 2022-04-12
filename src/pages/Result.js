import _ from "lodash";
import { useHistory, useParams } from "react-router-dom";
import Analysis from "../components/Anylysis";
import useAnswer from "../components/customhooks/useAnswer";
import Summery from "../components/Summery";
export default function Result() {
  const { id } = useParams();
  const { loading, error, answers } = useAnswer(id);
  const { location } = useHistory();
  const { state } = location;
  const { qna } = state;
  function calculate() {
    let score = 0;
    answers.forEach((answer, index1) => {
      let correctIndexes = [],
        checkedIndex = [];

      answer.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);

        if (qna[index1].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });
      if (_.isEqual(correctIndexes, checkedIndex)) {
        score = score + 5;
      }
    });
    return score;
  }
  const userScore = calculate();
  console.log(answers);
  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error.</div>}
      {answers && answers.length > 0 && (
        <>
          <Summery score={userScore} noq={answers.length}></Summery>
          <Analysis answers={answers}></Analysis>
        </>
      )}
    </>
  );
}
