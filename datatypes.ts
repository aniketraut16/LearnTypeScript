// Basic Types
let myName = "Bob";
// myName = 5; error

let yourName: string = "Bob";

let numberOfWheel: number = 4;

let isStudent: boolean = false;

// Custom Type Alias
type Food = string;

let myFood: Food = "maggie";

// Object Type Alias
type Person = {
  name: string;
  age: number;
  isStudent: boolean;
};

let person: Person = {
  name: "Joe",
  age: 42,
  isStudent: true,
};

// Array Types
const myL: number[] = [100, 102];
const names: string[] = ["Alice", "Bob", "Charlie"];
const scores: Array<number> = [99, 87, 76];

// Literal Types
type UserRole = "guest" | "member" | "admin";

let userRole: UserRole = "admin";

// Any Type (use with caution, disables type checking)
let val: any = 1;
val = "hello";
val = true;

// Unknown Type (requires type narrowing)
let inputValue: unknown = "some value";
if (typeof inputValue === "string") {
  console.log("It's a string:", inputValue);
}

// Optional Properties in Object Type
type Car = {
  make: string;
  model: string;
  year?: number;
};

let car: Car = {
  make: "Toyota",
  model: "Corolla",
};

// Union Types
let identifier: string | number;
identifier = "ID123";
identifier = 456;

// Tuple Types
let address: [string, number, string] = ["Main St", 123, "New York"];

// Readonly Array
const readonlyRoles: readonly string[] = ["admin", "user"];
// readonlyRoles.push("guest"); // Error: Cannot add to 'readonly' array

// Functions with Typed Parameters and Return Type
function add(a: number, b: number): number {
  return a + b;
}

// Void Return Type (for functions with no return value)
function logMessage(message: string): void {
  console.log(message);
}

// Type Narrowing with typeof
function printInfo(info: string | number) {
  if (typeof info === "string") {
    console.log("Text:", info.toUpperCase());
  } else {
    console.log("Number:", info * 2);
  }
}

// Type Narrowing with in Operator
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}

// Utility Types
type User = {
  name: string;
  age: number;
  email?: string;
};

let partialUser: Partial<User> = { name: "Alice" }; // Partial makes all properties optional

let requiredUser: Required<User> = {
  name: "Bob",
  age: 30,
  email: "bob@example.com",
}; // Required makes all properties mandatory

const readOnlyUser: Readonly<User> = { name: "Charlie", age: 25 };
// readOnlyUser.age = 26; // Error: Read-only property

type UserWithoutEmail = Omit<User, "email">; // Omit removes specified properties from the type
let userWithoutEmail: UserWithoutEmail = { name: "Dave", age: 28 };

// Generics
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const wrappedString = wrapInArray("hello"); // string[]
const wrappedNumber = wrapInArray(42); // number[]

class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

const stringBox = new Box<string>("TypeScript");
const numberBox = new Box<number>(101);
