// CreateCustomCategory.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { customCategoryState } from "../atoms";

interface IFormInput {
  customCategory: string;
}

function CreateCategory() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const setCustomCategories = useSetRecoilState(customCategoryState);

  const onSubmit = (data: IFormInput) => {
    setCustomCategories((oldCustomCategories) => [
      ...oldCustomCategories,
      data.customCategory,
    ]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("customCategory", { required: true })}
        placeholder="New Category"
      />
      <button type="submit">Add Category</button>
    </form>
  );
}

export default CreateCategory;
