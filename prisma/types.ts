export const fieldTypes: Record<
  string,
  Record<string, "string" | "number" | "boolean" | "date">
> = {

  user: {
    id: "number",
    firstname: "string",
    lastname: "string",
    email: "string",
    password: "string",
    description: "string",
    image: "string",
    refreshToken: "string",
    isActive: "boolean"
  },

  country: {
    id: "number",
    code: "string",
    image: "string"
  },

  city: {
    id: "number",
    countryId: "number",
    slug: "string",
    image: "string"
  },

  attraction: {
    id: "number",
    cityId: "number",
    slug: "string",
    image: "string",
    latitude: "number",
    longitude: "number",
    address: "string",
    website: "string"
  },

  language: {
    id: "number",
    code: "string",
    name: "string"
  }
};