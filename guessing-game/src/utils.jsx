

const checkIfMobile = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isMobileDevice =
    /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    return isMobileDevice;
};

const isKeyBoardVisible = () => {
  const isKeyboardVisible =
    window.innerHeight < document.documentElement.clientHeight;
  return isKeyboardVisible;
};

export { checkIfMobile, isKeyBoardVisible };
