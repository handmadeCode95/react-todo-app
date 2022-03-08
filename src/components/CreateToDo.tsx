import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

const Wrapper = styled.div`
  margin-bottom: 2vw;
`;

const Input = styled.input`
  width: 46vw;
  min-width: 360px;
  padding: 0 1.2vw;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((currentToDos) => {
      const tempToDo = [
        { id: Date.now(), text: toDo },
        ...currentToDos[category],
      ];
      const newToDos = {
        ...currentToDos,
        [category]: tempToDo,
      };
      return newToDos;
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(handleValid)}>
        <Input
          {...register("toDo", {
            required: "Please write a To Do",
            maxLength: 30,
          })}
          placeholder="Write a new to do"
          maxLength={30}
        />
      </form>
    </Wrapper>
  );
}

export default CreateToDo;
