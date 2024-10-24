import { auth } from "@/app/api/auth";

export const fetchClient = async (url, options) => {
  const session = await auth();

  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...(session && { Authorization: `BBBB ${session.accessToken}` }),
    },
  });
};
