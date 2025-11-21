"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const pool_1 = require("../config/pool");
const utils_1 = require("../utils");
const schemas_1 = require("../schemas");
const drizzle_orm_1 = require("drizzle-orm");
exports.userModel = {
  getAll: async () => {
    try {
      const result = await pool_1.db
        .select({
          id: schemas_1.users.id,
          firstname: schemas_1.users.firstname,
          lastname: schemas_1.users.lastname,
          email: schemas_1.users.email,
          phoneNumber: schemas_1.users.phoneNumber,
          roleName: schemas_1.roles.name,
          createdAt: schemas_1.users.createdAt,
        })
        .from(schemas_1.users)
        .leftJoin(
          schemas_1.roles,
          (0, drizzle_orm_1.eq)(schemas_1.users.roleId, schemas_1.roles.id),
        )
        .groupBy(schemas_1.users.id, schemas_1.roles.name);
      return result;
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération des utilisateurs: ",
        error,
      );
      throw new Error("Impossible de récupérer les utilisateurs");
    }
  },
  get: async (id) => {
    try {
      return await pool_1.db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          phoneNumber: true,
          addressCity: true,
          addressZip: true,
        },
        where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
      });
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getDetails: async (id) => {
    try {
      return await pool_1.db.query.users.findFirst({
        columns: {
          id: true,
          firstname: true,
          lastname: true,
          birthdate: true,
          email: true,
          phoneNumber: true,
          createdAt: true,
          addressStreet: true,
          addressCity: true,
          addressZip: true,
          addressCountry: true,
          coordLat: true,
          coordLon: true,
          isEmail: true,
          isSms: true,
          isDarkMode: true,
        },
        where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
        with: {
          role: {
            columns: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getCredentials: async (id) => {
    try {
      return await pool_1.db
        .select({
          password: schemas_1.users.password,
        })
        .from(schemas_1.users)
        .where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByCredentials: async (email) => {
    try {
      return await pool_1.db
        .select({
          id: schemas_1.users.id,
          password: schemas_1.users.password,
          email: schemas_1.users.email,
          firstname: schemas_1.users.firstname,
          lastname: schemas_1.users.lastname,
          tempTokenId: schemas_1.users.tempTokenId,
        })
        .from(schemas_1.users)
        .where((0, drizzle_orm_1.eq)(schemas_1.users.email, email));
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  findByPhoneNumber: async (phoneNumber) => {
    try {
      return await pool_1.db
        .select({
          id: schemas_1.users.id,
        })
        .from(schemas_1.users)
        .where((0, drizzle_orm_1.eq)(schemas_1.users.phoneNumber, phoneNumber));
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la récupération de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },
  getRoleByUser: async (id) => {
    try {
      return await pool_1.db
        .select({
          role: {
            name: schemas_1.roles.name,
          },
        })
        .from(schemas_1.users)
        .leftJoin(
          schemas_1.roles,
          (0, drizzle_orm_1.eq)(schemas_1.users.roleId, schemas_1.roles.id),
        )
        .where((0, drizzle_orm_1.eq)(schemas_1.users.id, id))
        .execute();
    } catch (error) {
      utils_1.logger.error(
        `Erreur lors de la récupération du rôle de l'utilisateur ${id}:`,
        error,
      );
      throw new Error(`Impossible de récupérer le rôle de l'utilisateur ${id}`);
    }
  },
  create: async (user) => {
    try {
      return await pool_1.db.insert(schemas_1.users).values(user).returning({
        id: schemas_1.users.id,
      });
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la création de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de créer l'utilisateur");
    }
  },
  update: async (id, user) => {
    try {
      return await pool_1.db
        .update(schemas_1.users)
        .set(user)
        .where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la mise à jour de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  },
  delete: async (id) => {
    try {
      return await pool_1.db
        .delete(schemas_1.users)
        .where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
    } catch (error) {
      utils_1.logger.error(
        "Erreur lors de la suppression de l'utilisateur: ",
        error,
      );
      throw new Error("Impossible de supprimer l'utilisateur");
    }
  },
};
