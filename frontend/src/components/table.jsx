import Container from "react-bootstrap/esm/Container";
import { default as BTable } from "react-bootstrap/Table";

const Table = ({ data }) => {
  return (
    <Container className="mt-4">
      <BTable striped bordered hover>
        <thead>
          <tr>
            {/* this should be moved to another prop called headers */}
            <th className="text-start w-auto">File Name</th>
            <th className="text-start w-auto">Text</th>
            <th className="text-start w-auto">Number</th>
            <th className="text-start w-auto">Hex</th>
          </tr>
        </thead>
        <tbody>
          {/* files object array could be flattened one level higher in component tree in sake of
            create more generic UI definition
          */}
          {data.map((fileData) =>
            fileData.lines.map((line, index) => (
              <tr key={`${fileData.file}-${index}`}>
                <td className="text-start">{fileData.file}</td>
                <td className="text-start">{line.text}</td>
                <td className="text-start">{line.number}</td>
                <td className="text-start">{line.hex}</td>
              </tr>
            ))
          )}
        </tbody>
      </BTable>
    </Container>
  );
};

export default Table;
