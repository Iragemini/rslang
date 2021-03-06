import React from "react";
import { Link } from "react-router-dom";

const List = ({ item, style, path, value }) => {
  return (
    <li className={style.li}>
      <i className={`far fa-folder mr-2 ${style.i}`}></i>
      <Link id={value} className='text-white text-decoration-none' to={path}>
        {item}
      </Link>
    </li>
  );
};

export default List;
