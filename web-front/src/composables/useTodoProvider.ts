import { ref, computed } from "vue";
import {
  fetchTodoListApi,
  createTodoApi,
  updateTodoApi,
  deleteTodoApi,
} from "../apis/todoApi";
import type { TodoType } from "../types/todo";

export const useTodoProvider = () => {
  const originTodoList = ref<Array<TodoType>>([]);
  const searchKeyword = ref("");

  const fetchTodoList = async () => {
    const res = await fetchTodoListApi();
    if (!res.data) return;
    originTodoList.value = res.data;
  };

  // 表示用のTodoリストを返す算出プロパティ
  const showTodoList = computed(() => {
    return originTodoList.value.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp("^" + searchKeyword.value, "i");
      return todo.title.match(regexp);
    });
  });

  const handleAddTodo = async (title: string, content: string) => {
    if (title.trim() !== "" && content.trim() !== "") {
      const res = await createTodoApi(title, content);
      if (res.data) originTodoList.value.push(res.data);
    }
  };

  const handleUpdateTodo = async (
    targetId: string,
    title: string,
    content: string
  ) => {
    if (title.trim() === "" || content.trim() === "") return;
    const todoId = Number(targetId);
    if (Number.isNaN(todoId)) return;
    const res = await updateTodoApi(todoId, title, content);
    if (res?.data) {
      const updateTodo = res.data;
      originTodoList.value = originTodoList.value.map((todo) => {
        return todo.id === todoId ? updateTodo : todo;
      });
    }
  };

  const handleDeleteTodo = (targetId: string, targetTitle: string) => {
    if (window.confirm(`「${targetTitle}」を削除しますか？`)) {
      const todoId = Number(targetId);
      if (Number.isNaN(todoId)) return;
      deleteTodoApi(Number(targetId));
      const newTodoList = originTodoList.value.filter((todo) => {
        return String(todo.id) !== targetId;
      });
      originTodoList.value = newTodoList;
    }
  };

  return {
    originTodoList,
    showTodoList,
    searchKeyword,
    fetchTodoList,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};
