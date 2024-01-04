import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteCoursePage() {
  const router = useRouter();
  const [courseInfo, setCourseInfo] = useState();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/courses?id=' + id).then(response => {
      setCourseInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push('/courses');
  }

  async function deleteCourse() {
    await axios.delete('/api/courses?id=' + id);
    router.push('/courses');
  }

  return (
    <Layout>
      <h1 className="text-center">Do you really want to delete &quot;{courseInfo?.title}&quot;?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteCourse} className="btn-red">Yes</button>
        <button className="btn-default" onClick={goBack}>NO</button>
      </div>
    </Layout>
  );
}
