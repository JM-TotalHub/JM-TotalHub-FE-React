import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  const openModal = ({ message, link }) => {
    // setModals((prevModals) => [
    //   ...prevModals,
    //   { id: Date.now(), message, link }, // 고유 id 부여
    // ]);
  };

  const closeModal = (id) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  };

  return (
    <AlertContext.Provider value={{ openModal, closeModal }}>
      {children}
    </AlertContext.Provider>
  );
};

// 모달 관리에 접근하는 Hook
export const useModal = () => {
  return useContext(AlertContext);
};
