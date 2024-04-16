import { Button, Col, Flex } from "antd";
import PHFrorm from "../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { TError, TResponse } from "../../../types/global";

const SemesterRegistration = () => {
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);
  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log("dataaaaaaaaaa", semesterData);

    try {
      const res = (await addRegisteredSemester(semesterData)) as TResponse<"">;
      console.log("resssssssssssssssssss", res);
      if (res.error as TError) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrorm onSubmit={onSubmit}>
          <PHSelect
            label="Academic Semester"
            name="academicSemester"
            disabled={false}
            options={academicSemesterOptions}
          />
          <PHSelect
            label="Status"
            name="status"
            disabled={false}
            options={semesterStatusOptions}
          />
          <PHDatePicker label="Start Date" name="startDate" />
          <PHDatePicker label="End Date" name="endDate" />
          <PHInput type="text" name="minCredit" label="Min Credit" />
          <PHInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </PHFrorm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
