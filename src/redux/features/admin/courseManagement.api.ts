import { TSemester } from "../../../types";
import { TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const courseMangementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/semester-ragistrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        console.log("dataaaaaaaaa", response);
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: "/semester-ragistrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-ragistrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<any>) => {
        console.log("dataaaaaaaaa", response);
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
  }),
});

export const {
  useAddRegisteredSemesterMutation,
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
  useGetAllCoursesQuery,
} = courseMangementApi;
