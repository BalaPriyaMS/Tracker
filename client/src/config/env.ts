import * as z from "zod";

const createEnv = () => {
  const EnvSchema = z.object({
    UI_URL: z.string(),
    API_URL: z.string(),
  });

  // ✅ Vite stores env vars in import.meta.env, not process.env
  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, [key, value]) => {
    if (key.startsWith("VITE_")) {
      acc[key.replace("VITE_", "")] = value as string;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    throw new Error(
      `Invalid env provided.\nMissing or invalid:\n${Object.entries(
        parsedEnv.error.flatten().fieldErrors
      )
        .map(([k, v]) => `- ${k}: ${v}`)
        .join("\n")}`
    );
  }

  return parsedEnv.data;
};

export const env = createEnv();
