import { TAcademicSemester } from "./academicManagement.type";

export type TStudentTransform = {
  meta: { name: string; age: number };
  result: { id: number; score: number };
};

export type TStudent = {
  _id: string;
  id: string;
  user: string;
  name: TName;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAdmissionSemester;
  isDeleted: boolean;
  fullName: string;
};

export type TUser = {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: string;
  status: string;
  isDeleted: boolean;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};
type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TAdmissionSemester = {
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
