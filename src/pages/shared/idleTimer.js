import React, { useState, useEffect } from "react";

const IdleTimer = (history) => {
  const [timeOut, handleTimeOut] = useState(1000 * 2 * 1);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const onAction = (e) => {
    console.log("user did something", e);
    setIsTimeOut(false);
  };

  let idleTimer = null;
  const onActive = (e) => {
    console.log("user is active", e);
    setIsTimeOut(false);
  };

  const onIdle = (e) => {
    console.log("user is idle", e);
    const isTimedOut = isTimeOut;
    if (isTimedOut) {
      history.push("/");
    } else {
      // this.setState({ showModal: true });
      idleTimer.reset();
      setIsTimeOut(true);
    }
  };

  return (
    <>
      <IdleTimer
        ref={(ref) => {
          idleTimer = ref;
        }}
        element={document}
        onActive={onActive}
        onIdle={onIdle}
        onAction={onAction}
        debounce={250}
        timeout={timeOut}
      />
    </>
  );
};

export default IdleTimer;
