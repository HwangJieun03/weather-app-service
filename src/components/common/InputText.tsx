import styled from "styled-components";

interface InputTextProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputText({ value, onChange }: InputTextProps) {
  return (
    <InputTextStyle>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        placeholder="도시명을 입력하세요" 
      />
    </InputTextStyle>
  );
}

const InputTextStyle = styled.div`
  input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
    margin-top: 10px;
  }
`;

export default InputText;
