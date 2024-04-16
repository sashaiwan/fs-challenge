import useGetFiles from "../hooks/useGetFiles";
import Table from "./table";

const FilesTable = () => {
  const { filesData, isLoading, error } = useGetFiles();

  if (isLoading) return <p>Loading data...</p>;
  if (error) return <p>Error loading data</p>;
  return <Table data={filesData} />;
};

export default FilesTable;
