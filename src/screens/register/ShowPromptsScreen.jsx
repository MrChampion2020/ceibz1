import React, { useContext, useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
const ShowPromptsScreen = () => {
  // const { prompts, setPrompts } = useContext(PromptsContext);
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const promptss = [
    {
      id: "0",
      name: "About me",
      questions: [
        {
          id: "10",
          question: "A random fact I love is",
        },
        {
          id: "11",
          question: "Typical Sunday",
        },
        {
          id: "12",
          question: "I go crazy for",
        },
        {
          id: "13",
          question: "Unusual Skills",
        },
        {
          id: "14",
          question: "My greatest strenght",
        },
        {
          id: "15",
          question: "My simple pleasures",
        },
        {
          id: "16",
          question: "A life goal of mine",
        },
      ],
    },
    {
      id: "2",
      name: "Self Care",
      questions: [
        {
          id: "10",
          question: "I unwind by",
        },
        {
          id: "11",
          question: "A boundary of mine is",
        },
        {
          id: "12",
          question: "I feel most supported when",
        },
        {
          id: "13",
          question: "I hype myself up by",
        },
        {
          id: "14",
          question: "To me, relaxation is",
        },
        {
          id: "15",
          question: "I beat my blues by",
        },
        {
          id: "16",
          question: "My skin care routine",
        },
      ],
    },
  ];
  const [option, setOption] = useState("About me");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (item) => {
    setModalVisible(true);
    setQuestion(item?.question);
  };

  useEffect(() => {
    if (prompts.length === 3) {
      setModalVisible(false);
      navigate("/prompts", { state: { prompts: prompts } });
    }
  });

  const addPrompt = () => {
    const newPrompt = { question, answer };
    setPrompts([...prompts, newPrompt]);
    setQuestion("");
    setAnswer("");
    setModalVisible(false);
    if (prompts.length === 3) {
      navigate("/prompts", { state: { prompts: prompts } }); // pass state to navigate
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between px-[3%] items-center my-[1%]">
        <h1 className="text-4xl font-bold" 
        
        style={{color: "#318ce7"}}
        >Prompts</h1>
        <button
          className="text-2xl font-semibold bg-gray border-none cursor-pointer transition duration-300 ease-in-out hover:text-white-700"
          onClick={() => navigate(-1)}
        >
          <RxCross2 />
        </button>
      </div>
      <hr className="bg-gray h-[1px]" />
      <div className="flex flex-row justify-evenly items-center my-[1%]">
        {promptss?.map((item, index) => (
          <button
            className="text-lg font-semibold cursor-pointer bg-blue border-1 border-gray px-[15px] py-[5px] rounded transition duration-300 ease-in-out hover:text-white-700"
            style={{
              backgroundColor: option === item?.name ? "#318ce7" : "white",
            }}
            onClick={() => setOption(item?.name)}
            key={index}
          >
            {item?.name}
          </button>
        ))}
      </div>
      <hr className="bg-gray h-[1px]" />
      <div>
        {promptss?.map((item, index) => (
          <div className="flex flex-col justify-between items-center mt-[2%]" key={index}>
            {option === item?.name &&
              item?.questions?.map((question, questionIndex) => (
                <button
                  className="text-lg font-semibold w-[40%] cursor-pointer border-1 border-gray px-[15px] py-[5px] my-[3px] rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white"
                  onClick={() => openModal(question)}
                  key={questionIndex}
                >
                  {question.question}
                </button>
              ))}
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        className="bg-opacity-80 bg-gray-200 fixed bottom-0 w-full h-[40%] z-10 flex flex-col items-center"
      >
        <h2 className="text-4xl font-extrabold my-[2%]">Answer your question</h2>
        <p className="text-lg font-semibold"> Question : {question} ...?</p>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter Your Answer"
          className="w-[40%] h-[23%] text-base p-[1%] mt-[20px] outline-none border-b-2 border-black resize-none"
          autoFocus
        />
        <button className="text-lg font-semibold cursor-pointer border-2 border-black px-[60px] py-[5px] my-[3px] rounded transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white" onClick={addPrompt}>
          Add
        </button>
      </Modal>
    </>
  );
};

export default ShowPromptsScreen;
