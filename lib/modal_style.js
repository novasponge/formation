export const modalStyle = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    display: "block",
    padding: "10px 5px",
    position : 'fixed',
    top : "50%",
    left : "50%",
    width : "500px",
    border : '1px solid #ccc',
    background : '#fff',
    overflow : 'auto',
    WebkitOverflowScrolling : 'touch',
    borderRadius : '4px',
    transform: 'translate(-50%, -50%)',
  }
};
