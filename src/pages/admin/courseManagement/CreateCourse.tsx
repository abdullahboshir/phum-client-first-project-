import { Button, Col, Flex } from "antd";
import PHFrorm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";

import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TError, TResponse } from "../../../types/global";
import PHInput from "../../../components/form/PHInput";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map(
    (item: { _id: string; title: string }) => ({
      value: item._id,
      label: item.title,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const courseData = {
      ...data,
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };

    console.log("course dataaaaaaaaa", courseData);

    // try {
    //   const res = (await addAcademicSemester(semesterData)) as TResponse<"">;

    //   if (res.error as TError) {
    //     toast.error(res?.error?.data.message, { id: toastId });
    //   } else {
    //     toast.success("Semester created", { id: toastId });
    //   }
    // } catch (error) {
    //   toast.error("something went wrong", { id: toastId });
    // }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrorm onSubmit={onSubmit}>
          <PHInput type="text" label="Name" name="title" />
          <PHInput type="text" label="Prefix" name="prefix" />
          <PHInput type="text" label="Code" name="code" />
          <PHInput type="text" label="credits" name="Credits" />
          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="PreRequisiteCourses"
          />

          <Button htmlType="submit">Submit</Button>
        </PHFrorm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
