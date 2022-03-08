import { useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Input = styled.input`
  width: 136px;
`;

interface IForm {
  newCategory: string;
}

function CreateCategory() {
  const setToDos = useSetRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ newCategory }: IForm) => {
    setToDos((currentToDos) => {
      const newToDos = {
        ...currentToDos,
        [newCategory]: [],
      };
      return newToDos;
    });
    setCategory(newCategory);
    setValue("newCategory", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("newCategory", {
          required: "Please write a To Do",
          maxLength: 10,
        })}
        placeholder="Write a new category"
        maxLength={10}
      />
    </form>
  );
}

export default CreateCategory;
