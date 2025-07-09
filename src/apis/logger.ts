"use server"

export const logger = async (message: string) => {
    console.log("LOG", JSON.stringify(message, null, 2))
}