import { Instance, types as T } from 'mobx-state-tree';

import { uid } from '~/helpers/utils/uid';
import { TTodo, Todo } from '~/models/Todo';

export enum TODO_FILTER {
  SHOW_ALL = 'show_all',
  SHOW_COMPLETED = 'show_completed',
  SHOW_ACTIVE = 'show_active',
}

const todoFilters: { [key in TODO_FILTER]: (todo: TTodo) => boolean } = {
  show_all: () => true,
  show_active: (todo) => !todo.completed,
  show_completed: (todo) => todo.completed,
};

const TodoStore = T.model('TodoStore', {
  todos: T.optional(T.map(Todo), {
    theme: { id: 'theme', task: 'styled-components theming', completed: false },
    mobx: { id: 'mobx', task: 'Next.js Bolierplate', completed: true },
    mst: { id: 'mst', task: 'MST(Mobx-State-Tree) Practice', completed: true },
  }),
  filter: T.optional(
    T.enumeration(Object.values(TODO_FILTER)),
    TODO_FILTER.SHOW_ALL,
  ),
})
  .views((self) => {
    const todosData = () => {
      return Array.from(self.todos.values());
    };
    return {
      get activeCount() {
        return todosData().filter(todoFilters.show_active).length;
      },
      get completedCount() {
        return todosData().filter(todoFilters.show_completed).length;
      },
      get filteredTodos() {
        return todosData().filter(todoFilters[self.filter]);
      },
    };
  })
  .actions((self) => ({
    setFilter(filter: TODO_FILTER) {
      self.filter = filter;
    },
    addTodo(task: string) {
      const id = uid.gen();
      self.todos.set(id, { id, completed: false, task });
    },
    removeTodo(id: string) {
      if (self.todos.has(id)) {
        self.todos.delete(id);
      }
    },
    toggleCompleted(id: string) {
      const target = self.todos.get(id);
      if (target) {
        self.todos.set(id, { ...target, completed: !target.completed });
      }
    },
    changeTask(id: string, task: string) {
      const target = self.todos.get(id);
      if (target) {
        self.todos.set(id, { ...target, task });
      }
    },
  }));

export type TTodoStore = Instance<typeof TodoStore>;
export default TodoStore;
