import { Button, Pagination, Space, Table, TableProps } from "antd";
import { TQueryParam } from "../../../types/global";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { TStudent } from "../../../types";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "id" | "fullName" | "email" | "contactNo" | "_id"
>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "limit", value: 7 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  const tableData = studentData?.data?.map(
    ({ id, _id, fullName, email, contactNo }: TTableData) => ({
      _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item: TTableData) => {
        return (
          <Space>
            <Link to={`/admin/student-data/${item._id}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={studentData?.meta.limit}
        total={studentData?.meta.total}
      />
    </>
  );
};

export default StudentData;
