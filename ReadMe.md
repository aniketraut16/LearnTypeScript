# TypeScript Cheat Sheet

## What is TypeScript?

TypeScript is a superset of JavaScript that introduces static typing to the language. Developed and maintained by Microsoft, it offers type safety, improved readability, and early error detection during development. By building on JavaScript’s syntax, it brings additional features, like interfaces, generics, and enums, which can enhance the structure and maintainability of large codebases. TypeScript files (`.ts` files) compile down to JavaScript (`.js`), allowing them to run in any environment where JavaScript can execute.

### Why Use TypeScript?

- **Static Typing**: Detects type errors during development instead of at runtime.
- **Enhanced IDE Support**: Improved autocompletion, navigation, and refactoring in editors.
- **Self-Documenting**: Code is easier to understand and maintain due to defined types.
- **Compatibility with JavaScript**: Fully compatible with JavaScript, making the transition to TypeScript smoother.

---

## 1. Basic Types

In TypeScript, basic types help to specify the kinds of values a variable can hold, adding clarity and enforcing consistency.

### Common Types

TypeScript offers the following basic types:

- `boolean` for true/false values.
- `number` for numeric values, supporting integers and floating points.
- `string` for text values.
- `array` for a collection of values, defined as `type[]` (e.g., `number[]`).
- `tuple` for fixed-length arrays with specific types in each position.
- `any` for disabling type-checking on a variable (use with caution).
- `unknown` for a variable with an unknown type that must be narrowed before use.

#### Code Examples

```typescript
let isComplete: boolean = true;
let height: number = 175;
let userName: string = "Aniket";
let scores: number[] = [92, 87, 76];
let address: [string, number] = ["Main St", 123];
let unknownVar: unknown = "Could be anything";

// Tuple example
const person: [string, number] = ["Alice", 30];
```

---

## 2. Literal Types

Literal types allow us to specify the exact value a variable must hold, enabling the creation of constants with only specific possible values.

### Example of Literal Types

Literal types can be numbers, strings, or booleans, helping to define strict value choices.

```typescript
let result: "success" | "failure" | "pending";
result = "success"; // valid
// result = "error"; // Error: Type '"error"' is not assignable to type '"success" | "failure" | "pending"'
```

### Using Literal Types with Type Alias

```typescript
type Status = "success" | "failure" | "pending";
let currentStatus: Status = "pending";
```

---

## 3. Custom Types (Objects)

Creating custom object types enhances readability and allows defining the structure of objects, improving type-checking for complex data structures.

### Defining Object Types

You can define object types using either `type` aliases or `interface` declarations.

#### Example with Type Alias

```typescript
type User = {
  name: string;
  age: number;
  isActive?: boolean; // Optional property
};

const user1: User = { name: "Alice", age: 30 };
const user2: User = { name: "Bob", age: 25, isActive: true };
```

#### Example with Interface

Interfaces are similar to type aliases but can be extended or implemented by classes.

```typescript
interface Employee {
  id: number;
  name: string;
}

interface Manager extends Employee {
  department: string;
}

const manager: Manager = { id: 1, name: "John", department: "Sales" };
```

---

## 4. Typed Arrays

Typed arrays allow you to enforce that all elements within an array belong to a specific type. They can store data with strict type enforcement, reducing runtime errors.

### Typed Arrays Syntax

You define a typed array using `type[]` or `Array<type>`.

```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["apple", "banana", "cherry"];
```

### Arrays of Custom Types

```typescript
type Product = {
  id: number;
  name: string;
};

let products: Product[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
];
```

### Readonly Arrays

`readonly` arrays prevent modification of elements after initialization.

```typescript
const roles: readonly string[] = ["admin", "user"];
// roles.push("guest"); // Error: Cannot add to 'readonly string[]'
```

---

## 5. Optional Properties

Optional properties are properties that may or may not be present in an object. They are useful for situations where not all properties are required to create an object.

### Example

Use `?` to define optional properties.

```typescript
type Car = {
  make: string;
  model: string;
  year?: number; // Optional
};

const car1: Car = { make: "Toyota", model: "Corolla" };
const car2: Car = { make: "Ford", model: "Mustang", year: 2020 };
```

---

## 6. Unions

Union types allow a variable to hold values of multiple types, expanding flexibility while maintaining type safety. They are ideal for cases where a variable can have several specific types.

### Union Types Example

```typescript
let id: number | string;
id = 42;
id = "ID123";
```

### Using Union Types in Functions

```typescript
function format(value: string | number): string {
  return `Value: ${value}`;
}
```

---

## 7. Type Narrowing

Type narrowing lets TypeScript infer a more specific type from a union, based on checks within code. This improves type safety and helps avoid errors.

### Using `typeof` for Type Narrowing

```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log("ID:", id.toUpperCase());
  } else {
    console.log("ID doubled:", id * 2);
  }
}
```

### Using `in` Operator for Type Narrowing

```typescript
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

---

## 8. Utility Types

TypeScript offers several utility types that simplify common type transformations, making type declarations easier.

### `Partial<T>`

Makes all properties of a type optional.

```typescript
type User = { name: string; age: number };
let partialUser: Partial<User> = { name: "Alice" }; // Only `name` is provided
```

### `Required<T>`

Makes all properties of a type required.

```typescript
type UserProfile = { name?: string; age?: number };
let userProfile: Required<UserProfile> = { name: "Bob", age: 30 };
```

### `Readonly<T>`

Prevents modification of properties.

```typescript
type Product = { id: number; name: string };
const product: Readonly<Product> = { id: 1, name: "Laptop" };
// product.name = "Tablet"; // Error: 'name' is read-only
```

### `Omit<T, K>`

Creates a new type by removing specified properties `K` from type `T`.

```typescript
type User = { id: number; name: string; email: string };
type UserWithoutEmail = Omit<User, "email">; // { id: number, name: string }
```

---

## 9. Generics

Generics allow for the creation of types that work with any type, adding flexibility to functions, interfaces, and classes.

### Generic Functions

Generics are specified with angle brackets `<T>` and can accept different types.

```typescript
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<number>(123)); // Output: 123
```

### Constraining Generics

Generics can be constrained to certain properties to ensure type safety.

```typescript
function printName<T extends { name: string }>(obj: T) {
  console.log("Name:", obj.name);
}

printName({ name: "Aniket", age: 21 }); // valid
// printName({ age: 21 }); // Error: 'name' is missing
```

### Generic Classes

Classes can be made generic to handle different types of data.

```typescript
class Box<T> {
  private content: T;

  constructor(value: T) {
    this.content = value;
  }

  getContent(): T {
    return this.content;
  }
}

const stringBox = new Box<string>("TypeScript");
const numberBox = new Box<number>(101);

console.log(stringBox.getContent()); // Output: TypeScript
console.log(numberBox.getContent()); // Output: 101
```

---
