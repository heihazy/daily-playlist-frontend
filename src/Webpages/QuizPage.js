import React, { Component } from "react";

import quizQuestions from "./../API/quizQuestions/quizQuestions";
import Quiz from "./../Components/Quiz/Quiz";
import Result from "./../Components/Result/Result";
import Loader from "./../Components/Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

class QuizPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: "",
      story: "",
      answerOptions: [],
      answer: "",
      answersCount: {},
      result: "",
      img: "",
      loading: false,
      text: "",
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  wait = async (milliseconds = 3000) => {
    this.setState({
      loading: true,
    });
    await this.sleep(milliseconds);
    this.setState({
      loading: false,
    });
  };
  componentDidMount() {
    this.wait();
    const shuffledAnswerOptions = quizQuestions.map((question) =>
      this.shuffleArray(question.answers)
    );

    this.setState({
      img: quizQuestions[0].img,
      story: quizQuestions[0].story,
      question: quizQuestions[0].question,
      answerOptions: shuffledAnswerOptions[0],
      text: quizQuestions[0].text,
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < quizQuestions.length) {
      this.wait();
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      setTimeout(() => this.setResults(this.getResults()), 300);
    }
  }

  setUserAnswer(answer) {
    this.setState((state, props) => ({
      answersCount: {
        ...state.answersCount,
        [answer]: (state.answersCount[answer] || 0) + 1,
      },
      answer: answer,
    }));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      story: quizQuestions[counter].story,
      img: quizQuestions[counter].img,
      answerOptions: quizQuestions[counter].answers,
      answer: "",
      text: quizQuestions[counter].text,
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(
      (key) => answersCount[key] === maxAnswerCount
    );
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: "Mixed" });
    }
  }

  renderQuiz() {
    return (
      <Quiz
        img={this.state.img}
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        story={this.state.story}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

  render() {
    if (this.state.loading) {
      if (!this.state.text && document.querySelector("p.loader-text")) {
        document.querySelector("p.loader-text").style.visibility = "hidden";
      } else if (this.state.text && document.querySelector("p.loader-text")) {
        document.querySelector("p.loader-text").style.visibility = "visible";
      }
      return <Loader src={this.state.img} text={this.state.text} />;
    }
    return (
      <div className="App">
        <img
          src={this.state.img}
          alt="pic"
          style={{
            display: "block",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        ></img>
        <div className="quiz-render">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      </div>
    );
  }
}

export default QuizPage;
