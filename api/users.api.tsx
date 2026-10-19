import { url } from "./client";
import { SignupForm, UserInputType } from "../types/user";

export const createUser = async (user: UserInputType) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${url}/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw Object.assign(
        new Error(data?.message ?? "Something went wrong. Please try again."),
        {
          name: data?.error ?? "REQUEST FAILED",
          status: response.status,
          fieldErrors: data?.fieldErrors,
        },
      );
    }
    return data.userData;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${url}login-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw Object.assign(
        new Error(data?.message ?? "Something went wrong. Please try again."),
        { name: data?.error ?? "REQUEST_FAILED", status: response.status },
      );
    }
    return data;
  } catch (err) {
    console.log(err);
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("The request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
};
