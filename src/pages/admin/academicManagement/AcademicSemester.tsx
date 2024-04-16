import { Button, Table, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TQueryParam } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { useState } from "react";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemestersQuery(params);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  console.log("aaaaaaaaaaaaa", semesterData);
  const tableData = semesterData?.data?.map(
    ({ _id, name, startMonth, endMonth, year }: TTableData) => ({
      _id,
      name,
      startMonth,
      endMonth,
      year,
    })
  );

  console.log("table dataaaaaaaaaa?", tableData);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("filterrrrrrrrrrrr", extra, filters);
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
