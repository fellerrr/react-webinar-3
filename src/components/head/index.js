import PropTypes from "prop-types";
import './style.css';
import {memo} from "react";

function Head({title}){
  return (
    <div className='Head'>
      <h1>{title}</h1>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
