import { Button, Dropdown, Table, Tag } from "antd";
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { TSemester } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const SemesteredRegisters = () => {
  const [semesterId, setSemesterId] = useState("");
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateRegisteredSemester] = useUpdateRegisteredSemesterMutation();

  console.log("ressssssssssssss", updateRegisteredSemester);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
      status,
    })
  );

  console.log("itemmmmmmmm", semesterId);

  const handleStatusUpdate = (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    updateRegisteredSemester(updateData);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        return (
          <Tag
            color={
              item === "UPCOMING"
                ? "blue"
                : item === "ONGOING"
                ? "green"
                : "red"
            }
          >
            {item}
          </Tag>
        );
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "EndDate",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item._id)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
    />
  );
};

export default SemesteredRegisters;
