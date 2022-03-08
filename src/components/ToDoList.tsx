import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  categorySelector,
  toDoSelector,
  toDoState,
} from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-top: 4vw;
  margin-bottom: 6vw;
  img {
    width: 6vw;
    margin-right: 1.2vw;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 5vw;
  span {
    white-space: nowrap;
    color: ${({ theme: { subColor } }) => subColor};
  }
`;

const Categories = styled.nav`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin-bottom: 4vw;
  * {
    margin: 4px;
  }
`;

const ToDoWrapper = styled.main`
  width: 44vw;
  min-width: 340px;
`;

const RemoveButton = styled.button<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? null : "none")};
  margin-left: -2px;
  background: none;
  border: 2px solid ${({ theme: { borderColor } }) => borderColor};
  height: 24px;
  border-radius: 6px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  background: ${({ isSelected, theme: { subColor } }) =>
    isSelected ? subColor : "none"};
  color: ${({ isSelected, theme: { subColor, borderColor } }) =>
    isSelected ? borderColor : subColor};
  border: ${({ isSelected, theme: { borderColor } }) =>
    isSelected ? "none" : `2px solid ${borderColor}`};
  border-radius: 6px;
  height: 24px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : null)};
`;

function ToDoList() {
  const TODOS_KEY = "todos";
  const CATEGORY_KEY = "category";
  const selectedToDos = useRecoilValue(toDoSelector);
  const toDoCategories = useRecoilValue(categorySelector);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    setCategory(event.currentTarget.value);
  };

  const removeCategory = () => {
    if (toDoCategories.length <= 1) return;

    const newCategories = toDoCategories.filter(
      (toDoCategory) => toDoCategory !== category
    );

    setToDos((currentToDos) => {
      let newToDos = {};
      newCategories.map((newCategory) => {
        newToDos = {
          ...newToDos,
          [newCategory]: currentToDos[newCategory],
        };
      });
      return newToDos;
    });
    setCategory(newCategories[0]);
  };

  useEffect(() => {
    const saveToDos = localStorage.getItem(TODOS_KEY);
    const saveCategory = localStorage.getItem(CATEGORY_KEY);
    if (saveToDos !== null) {
      setToDos(JSON.parse(saveToDos));
    }
    if (saveCategory !== null) {
      setCategory(JSON.parse(saveCategory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
  }, [toDos]);

  useEffect(() => {
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(category));
  }, [category]);

  return (
    <Container>
      <Header>
        <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="🌐" />
        <Title>
          React <span>To-Dos</span>
        </Title>
      </Header>

      <Categories>
        {toDoCategories.map((toDoCategory, index) => (
          <>
            <Button
              key={index}
              value={toDoCategory}
              onClick={onClick}
              isSelected={toDoCategory === category ? true : false}
            >
              {toDoCategory}
            </Button>
            <RemoveButton
              onClick={removeCategory}
              isVisible={toDoCategory === category ? true : false}
            >
              ❌
            </RemoveButton>
          </>
        ))}
        <CreateCategory />
      </Categories>

      <CreateToDo />
      <ToDoWrapper>
        <ul>
          {selectedToDos?.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </ToDoWrapper>
    </Container>
  );
}

export default ToDoList;
