export default async function ssgServer() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/10"
    );

    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("ssg error", error);
    throw error;
  }
}
