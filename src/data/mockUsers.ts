export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  heroTitle: string;
};

export const mockUsers: MockUser[] = [
  {
    id: "guardian-01",
    name: "Clara Solaris",
    email: "clara@herois.com",
    password: "sol123",
    heroTitle: "Guardia do Metabolismo",
  },
  {
    id: "strategist-02",
    name: "Davi Orion",
    email: "davi@herois.com",
    password: "orion123",
    heroTitle: "Estrategista Financeiro",
  },
  {
    id: "mindful-03",
    name: "Lia Aqua",
    email: "lia@herois.com",
    password: "aqua123",
    heroTitle: "Mente Calma",
  },
];

export type PublicUser = Omit<MockUser, "password">;
