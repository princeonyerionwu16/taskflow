import serverEntry from "../src/server";

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  if (serverEntry && typeof (serverEntry as any).fetch === "function") {
    return (serverEntry as any).fetch(request, {}, {});
  }

  return new Response("Server entry not available", { status: 500 });
}
