// app/page.tsx
import UploadComponent from "./upload/UploadComponent";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Upload Your File</h1>
      <UploadComponent />
    </main>
  );
}
