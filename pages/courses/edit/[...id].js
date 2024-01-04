import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import CourseForm from "@/components/CourseForm";

export default function EditCoursePage() {
  const [courseInfo, setCourseInfo] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/api/courses?id='+id).then(response => {
      setCourseInfo(response.data);
    });
  }, [id]);
  return (
    <Layout>
      <h1>Edit course</h1>
      {courseInfo && (
        <CourseForm {...courseInfo} />
      )}
    </Layout>
  );
}