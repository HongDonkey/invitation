import { promises as fs } from "fs";
import { evaluate, EvaluateOptions } from "next-mdx-remote-client/rsc";
import path from "path";
import { PostFrontmatter } from "@/features/posts/types/post";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    console.log("Fetching post with slug:", slug);
    
    const filePath = path.join(process.cwd(), "src/data/posts", `${slug}.mdx`);
    console.log("File path:", filePath);
    
    // 파일 존재 여부 확인
    try {
      await fs.access(filePath);
    } catch (accessError) {
      console.error("File access error:", accessError);
      return Response.json(
        { error: "Post not found", details: `File not found at ${filePath}` },
        { status: 404 }
      );
    }

    const source = await fs.readFile(filePath, "utf-8");
    console.log("File read successfully, content length:", source.length);
    
    return Response.json(
      { 
        content: source,
        slug
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "";
    console.error("Error Stack:", errorStack);
    
    return Response.json(
      { 
        error: "Failed to load post", 
        details: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}
