import { Instance, types as T } from 'mobx-state-tree';

import { uid } from '~/helpers/utils/uid';
import { AddTodoPayload, TTodo, Todo } from '~/models/Todo';

export enum TODO_FILTER {
  SHOW_ALL = 'show_all',
  SHOW_COMPLETED = 'show_completed',
  SHOW_ACTIVE = 'show_active',
}

const todoFilters: { [key in TODO_FILTER]: (todo: TTodo) => boolean } = {
  show_all: () => true,
  show_active: (todo) => !todo.done,
  show_completed: (todo) => todo.done,
};

const TodoStore = T.model('TodoStore', {
  todos: T.optional(T.map(Todo), {}),
  filter: T.optional(
    T.enumeration(Object.values(TODO_FILTER)),
    TODO_FILTER.SHOW_ALL,
  ),
})
  .views((self) => {
    return {
      get todosData() {
        return Array.from(self.todos.values());
      },
      get activeCount() {
        return this.todosData.filter(todoFilters.show_active).length;
      },
      get completedCount() {
        return this.todosData.filter(todoFilters.show_completed).length;
      },
      get filteredTodos() {
        return this.todosData.filter(todoFilters[self.filter]);
      },
    };
  })
  .actions((self) => ({
    setFilter(filter: TODO_FILTER) {
      self.filter = filter;
    },
    addTodo(payload: AddTodoPayload) {
      const id = uid.gen();

      self.todos.set(id, { id, done: false, task: payload.task });
    },
    removeTodo(id: string) {
      if (self.todos.has(id)) {
        self.todos.delete(id);
      }
    },
    toggleDone(id: string) {
      const target = self.todos.get(id);
      if (target) {
        self.todos.set(id, { ...target, done: !target.done });
      }
    },
  }));

export type TTodoStore = Instance<typeof TodoStore>;
export default TodoStore;
