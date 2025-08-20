"use server";

export const serverLogger = async (message: string) => {
  console.log("[SERVER LOG]", JSON.stringify(message, null, 2));
};
