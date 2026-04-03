import fs from "fs";
import path from "path";

export async function GET() {
  const dirPath = path.join(process.cwd(), "public/images/anniversary");

  try {
    const files = fs.readdirSync(dirPath);

    const images = files
      .filter(file => file.endsWith(".jpg"))
      .map(file => `/images/anniversary/${file}`);

    return Response.json(images);
  } catch (error) {
    return Response.json([]);
  }
}