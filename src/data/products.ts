

export enum CarCategory {
  Sedan = "Sedan",
  SUV = "SUV",
  Truck = "Truck",
  Coupe = "Coupe",
  Convertible = "Convertible",
  Sports = "Sports",
  Luxury = "Luxury",
  Electric = "Electric",
}


export interface CarProduct {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: CarCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
}

export const products: CarProduct[] = [
  {
    id: 1,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 39990,
    category: CarCategory.Sedan,
    description:
      "The Tesla Model 3 is an electric four-door fastback sedan developed by Tesla. The Model 3 Standard Range Plus version delivers an EPA-rated all-electric range of 263 miles (423 km) and the Long Range versions deliver 353 miles (568 km).",
    quantity: 10,
    inStock: true,
    image: "/tesla-model-3.webp",
  },
  {
    id: 2,
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    price: 27470,
    category: CarCategory.Coupe,
    description:
      "The Ford Mustang is a series of American automobiles manufactured by Ford. In continuous production since 1964, the Mustang is currently the longest-produced Ford car nameplate.",
    quantity: 5,
    inStock: true,
    image: "/ford-mustang.webp",
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 25295,
    category: CarCategory.Sedan,
    description:
      "The Toyota Camry is an automobile sold internationally by the Japanese manufacturer Toyota since 1982, spanning multiple generations. The Camry is renowned for its reliability, comfort, and fuel efficiency.",
    quantity: 15,
    inStock: true,
    image: "/toyota-camry.avif",
  },
  {
    id: 4,
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 21700,
    category: CarCategory.Sedan,
    description:
      "The Honda Civic is a line of cars manufactured by Honda. Originally a subcompact, the Civic has gone through several generational changes, becoming both larger and more upscale, moving into the compact car segment.",
    quantity: 8,
    inStock: true,
    image: "/honda-civic.avif",
  },
  {
    id: 5,
    brand: "BMW",
    model: "3 Series",
    year: 2023,
    price: 41450,
    category: CarCategory.Sedan,
    description:
      "The BMW 3 Series is a line of compact executive cars manufactured by the German automaker BMW since May 1975. It is the successor to the 02 Series and has been produced in seven different generations.",
    quantity: 3,
    inStock: true,
    image: "/bmw-3-series.jpg",
  },
  {
    id: 6,
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 39100,
    category: CarCategory.Sedan,
    description:
      "The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group. The A4 has been built in five generations and is based on the Volkswagen Group B platform.",
    quantity: 6,
    inStock: true,
    image: "/audi-a4.avif",
  },
];
