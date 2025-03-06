import CoursePageClient from "./CoursePageClient"; // Import the client component

export async function generateMetadata({ params }) {
  try {
    const res = await fetch(
      `https://test.trainomart.com/api/courses/slug/${params.slug}/`
    );

    if (!res.ok) throw new Error("Failed to fetch course metadata");

    const data = await res.json();

    return {
      title: data.meta_title || "Default Course Title",
      description: data.meta_description || "Default Course Description",
      canonical: data.canonical_tag || "", // ✅ Use direct canonical key
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Error Loading Course",
      description: "There was an issue fetching the course details.",
      canonical: "",
    };
  }
}

export default function CoursePage({ params }) {
  return <CoursePageClient slug={params.slug} />;
}
