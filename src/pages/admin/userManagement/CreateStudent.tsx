import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupsOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";

const studentDefaultValues = {
  name: {
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
  },
  gender: "male",

  bloodGroup: "A+",
  email: "john@example.com",
  contactNo: "1235678", // Consistent formatting
  emergencyContactNo: "9876543210", // Consistent formatting
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1112223333", // Consistent formatting
    motherName: "Mary Doe",
    motherOccupation: "Teacher",
    motherContactNo: "4445556666", // Consistent formatting
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Doctor",
    contactNo: "7778889999", // Consistent formatting
    address: "789 Pine St, Villageton",
  },

  admissionSemester: "65817549bc344a66b5b01c09", // Replace with valid semester ID
  academicDepartment: "65847e5e84258119248d27a1", // Replace with valid department ID
};

const CreateStudent = () => {
  const [addStudent] = useAddStudentMutation();
  const { data: sData, isLoading } = useGetAllSemestersQuery(undefined);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.profileImg);

    addStudent(formData);
    //! This is for develepment, just for checking data
    console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={studentDefaultValues}
          resolver={null}
        >
          <Row gutter={8}>
            <Divider>Personal Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="Frist Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Gender"
                name="gender"
                options={genderOptions}
                disabled={isLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupsOptions}
                disabled={isLoading}
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      type="file"
                      {...field}
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target?.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>

            <Divider>Contact Info.</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No." />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>

            <Divider>Guardian Information</Divider>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father's Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother's Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.name"
                label="Local Guardian's Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Local Guardian's Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Local Guardian's Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Local Guardian's Address"
              />
            </Col>

            <Divider>Academic Info.</Divider>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={isLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
