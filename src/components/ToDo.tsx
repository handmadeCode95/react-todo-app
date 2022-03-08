import { categorySelector, categoryState, IToDo, toDoState } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const Li = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    flex-wrap: nowrap;
  }
`;

const Select = styled.select`
  background: none;
  border: none;
  color: ${({ theme: { subColor } }) => subColor};
  border-bottom: 2px solid ${({ theme }) => theme.borderColor};
  &:focus {
    outline: none;
  }
  option {
    background-color: ${({ theme: { bgColor } }) => bgColor};
  }
`;

const Button = styled.button`
  background: none;
  border: 2px solid ${({ theme: { borderColor } }) => borderColor};
  border-radius: 6px;
  margin-left: 0.3vw;
`;

function ToDo({ id, text }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const toDoCategories = useRecoilValue(categorySelector);

  const onChange = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value: newCategory },
    } = event;

    setToDos((currentToDos) => {
      const moveToDo = [...currentToDos[newCategory], { id, text }];

      const newToDos = {
        ...currentToDos,
        [newCategory]: moveToDo,
        [category]: currentToDos[category].filter((toDo) => toDo.id !== id),
      };

      return newToDos;
    });
  };

  const onClick = () => {
    setToDos((currentToDos) => {
      const newToDos = {
        ...currentToDos,
        [category]: currentToDos[category].filter((toDo) => toDo.id !== id),
      };
      return newToDos;
    });
  };

  return (
    <Li>
      <span>{text}</span>
      <div>
        <Select onChange={onChange} defaultValue={category}>
          {toDoCategories.map((toDoCatetory, index) => (
            <option key={index} value={toDoCatetory}>
              {toDoCatetory}
            </option>
          ))}
        </Select>
        <Button onClick={onClick}>❌</Button>
      </div>
    </Li>
  );
}

export default ToDo;
