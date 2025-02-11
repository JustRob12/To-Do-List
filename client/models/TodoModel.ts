import AsyncStorage from '@react-native-async-storage/async-storage';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export class TodoModel {
  private todos: Todo[];
  private readonly STORAGE_KEY = 'todos';

  constructor() {
    this.todos = [];
    this.loadFromStorage();
  }

  private async loadFromStorage(): Promise<void> {
    try {
      const storedTodos = await AsyncStorage.getItem(this.STORAGE_KEY);
      this.todos = storedTodos ? JSON.parse(storedTodos) : [];
    } catch (e) {
      console.error('Error loading todos from AsyncStorage:', e);
      this.todos = [];
    }
  }

  private async saveToStorage(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
    } catch (e) {
      console.error('Error saving todos to AsyncStorage:', e);
    }
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  async addTodo(text: string): Promise<void> {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false
    };
    this.todos.push(newTodo);
    await this.saveToStorage();
  }

  async deleteTodo(id: number): Promise<void> {
    this.todos = this.todos.filter(todo => todo.id !== id);
    await this.saveToStorage();
  }

  async toggleTodo(id: number): Promise<void> {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await this.saveToStorage();
  }
} 