const InputField = ({ text, handleInput, handleSubmit }) => {
  return (
    <label htmlFor="">
      <input
        type="text"
        value={text}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Add ToDo</button>
    </label>
  );
};

export default InputField;
