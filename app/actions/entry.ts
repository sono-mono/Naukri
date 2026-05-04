"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ROLE_COOKIE = "bluelink-role";
const ACTOR_COOKIE = "bluelink-actor";

function createActorId(prefix: string) {
  return `${prefix}_${crypto.randomUUID()}`;
}

async function setDirectAccessContext(role: "WORKER" | "EMPLOYER") {
  const cookieStore = await cookies();
  const existingActorId = cookieStore.get(ACTOR_COOKIE)?.value;

  cookieStore.set(ROLE_COOKIE, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set(ACTOR_COOKIE, existingActorId ?? createActorId(role.toLowerCase()), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function continueAsWorker() {
  await setDirectAccessContext("WORKER");
  redirect("/worker");
}

export async function continueAsEmployer() {
  await setDirectAccessContext("EMPLOYER");
  redirect("/employer");
}
