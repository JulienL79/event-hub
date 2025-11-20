import { z } from "zod";

// Validator pour créer ou mettre à jour un utilisateur
export const userValidation = z.object({
  id: z.string().uuid().optional(), // defaultRandom()
  roleName: z.enum(["participant", "organizer"]),

  firstname: z
    .string()
    .trim()
    .min(1, { message: "Le prénom est requis" })
    .max(255, { message: "Le prénom ne doit pas dépasser 255 caractères" }),

  lastname: z
    .string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(255, { message: "Le nom ne doit pas dépasser 255 caractères" }),

  birthdate: z.coerce.date({ message: "La date de naissance est requise" }),

  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne doit pas dépasser 255 caractères" }),

  phoneNumber: z
    .string()
    .trim()
    .max(20, { message: "Le numéro de téléphone est trop long" }),

  password: z
    .string()
    .trim()
    .min(6, {
      message: "Votre mot de passe doit contenir au moins 6 caractères",
    })
    .max(255, {
      message: "Le mot de passe ne doit pas dépasser 255 caractères",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial",
    }),

  addressStreet: z
    .string()
    .trim()
    .min(1, { message: "La rue est requise" })
    .max(255, { message: "La rue ne doit pas dépasser 255 caractères" }),

  addressCity: z
    .string()
    .trim()
    .min(1, { message: "La ville est requise" })
    .max(255, { message: "La ville ne doit pas dépasser 255 caractères" }),

  addressZip: z
    .string()
    .trim()
    .length(5, { message: "Le code postal doit contenir 5 caractères" }),

  addressCountry: z
    .string()
    .trim()
    .min(1, { message: "Le pays est requis" })
    .max(255, { message: "Le pays ne doit pas dépasser 255 caractères" }),

  coordLat: z.string().trim().min(1, { message: "Latitude incorrecte" }),
  coordLon: z.string().trim().min(1, { message: "Longitude incorrecte" }),

  isEmail: z.boolean().optional(),
  isSms: z.boolean().optional(),

  language: z.string().trim().max(10).optional(),
  theme: z.string().trim().max(20).optional(),

  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),

  tempTokenId: z.string().uuid().optional(),
});

// Si tu veux inférer le type TypeScript à partir du validator
export type UserInput = z.infer<typeof userValidation>;
