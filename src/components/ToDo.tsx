import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Categories, IToDo, toDoState, customCategoryState } from "../atoms";

function getCategoryName(categoryKey: string) {
  const categoryNames = {
    TO_DO: "To Do",
    DOING: "Doing",
    DONE: "Done",
  };

  if (isCategoryKey(categoryKey)) {
    return categoryNames[categoryKey];
  }

  // 커스텀 카테고리나 유효하지 않은 키의 경우, 원래 키를 반환
  return categoryKey;
}

function isCategoryKey(key: any): key is keyof typeof Categories {
  return key in Categories;
}

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategories = useRecoilValue(customCategoryState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {Object.values(Categories)
        .filter((cat) => cat !== category)
        .map((cat) => (
          <button key={cat} name={cat} onClick={onClick}>
            {getCategoryName(cat)}
          </button>
        ))}
      {customCategories
        .filter((cat) => cat !== category)
        .map((cat) => (
          <button key={cat} name={cat} onClick={onClick}>
            {cat}
          </button>
        ))}
    </li>
  );
}

export default ToDo;
