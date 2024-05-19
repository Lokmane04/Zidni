import { Fragment } from "react";
import { Message } from "./message";
import PropTypes from "prop-types";

Body.propTypes = {
  isLoading: PropTypes.bool,
  listQst: PropTypes.array,
  listRes: PropTypes.array,
};

function Body({ isLoading, listQst, listRes }) {
  const list = [];
  listQst.map((qst, index) => {
    list.push({ qst, res: listRes.length > index ? listRes[index] : "" });
  });
  return (
    <div className="flex bg-[#020817] dark:bg-[#fdfdfd] justify-start flex-col space-y-5 overflow-y-auto w-full h-4/6 p-1.5">
      {list.length === 0 && (
        <p className="flex justify-center items-center h-1/7 text-center text-[14px] text-[#213547] dark:text-[#A3A3A3]">
          This AI chatbot will help you discover the functionalities of the
          plateform and answer on you questions!
        </p>
      )}
      {list.map((msg, index) => (
        <Fragment key={index}>
          <Message isAns={false}>{msg.qst}</Message>
          {msg.res && <Message isAns={true}>{msg.res}</Message>}
        </Fragment>
      ))}
      {isLoading && <Message isAns={true}>...</Message>}
    </div>
  );
}

export default Body;
