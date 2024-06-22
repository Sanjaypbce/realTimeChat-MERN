import React, { useState } from "react";
import style from "./ThreeDotDropdown.module.css";
import ModalComponent from "./ModalComponent";
import { useNavigate } from "react-router-dom";

const ThreeDotDropdown = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const logout = () => {
    localStorage.setItem("token", "");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  return (
    <>
      <div className={style.acountPop}>
        <div
          className={style.acountPopMenu}
          onClick={() => setShowModal(!showModal)}
        >
          user setting
        </div>
        <div className={style.acountPopMenu}>Add account</div>
        <div className={style.acountPopMenu}>status</div>
        <div className={style.acountPopMenu} onClick={logout}>
          Logout
        </div>
      </div>
      <ModalComponent showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default ThreeDotDropdown;
