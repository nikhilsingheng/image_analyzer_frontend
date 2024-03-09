import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileCsv } from "react-icons/fa";
const ImageListing = () => {
  const [listingData, setListingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchImageData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/analysis-results/"
      );
      setListingData(response.data.results);
    } catch (error) {
      console.log("Error fetching image data:", error);
    }
  };
  useEffect(() => {
    fetchImageData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listingData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
  const downloadCsv = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/generate-csvreport/"
      );
      if (response.status === 200) {
        const link = document.createElement("a");
        link.href = "http://127.0.0.1:8000/media/csv/report.csv";
        link.download = "report.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/generate-pdfreport/"
      );
      if (response.status === 200) {
        const url =
          "http://127.0.0.1:8000/media/pdf_reports/analysis_report.pdf";
        const link = document.createElement("a");
        link.href = url;
        link.download = "analysis_report.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container px-5">
      <div className="heading_btn">
        <div>
          <h2 className=" mt-4">Image Listing</h2>
        </div>

        <div>
          <button className="pdf_btn" onClick={downloadPDF}>
            <FaFilePdf style={{ color: "red" }} /> PDF
          </button>
          <button className="csv_btn " onClick={downloadCsv}>
            <FaFileCsv style={{ color: "green" }} /> CSV
          </button>
        </div>
      </div>
      {currentItems && currentItems.length > 0 ? (
        <table className="table custom-table">
          <thead>
            <tr>
              <th style={{ width: "200px" }}>Image</th>
              <th style={{ width: "200px" }}>Height</th>
              <th style={{ width: "200px" }}>Width</th>
              <th style={{ width: "200px" }}>Image Size</th>
              <th style={{ width: "200px" }}>Speed</th>
              <th style={{ width: "200px" }}>Speed Flag</th>
              <th style={{ width: "200px" }}>Image Height Flag</th>
              <th style={{ width: "200px" }}>Analyzed</th>
              <th style={{ width: "200px" }}>Analyzed at</th>
            </tr>
          </thead>
          <tbody>
            {currentItems &&
              currentItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ width: "500px" }}>
                    <img
                      src={`http://127.0.0.1:8000${item.image}`}
                      className="image-fixed"
                      alt={item.image}
                    />
                  </td>
                  <td>{item.height}</td>
                  <td style={{ width: "200px" }}>
                    {item.width == null ? "No width " : item.width}
                  </td>
                  <td style={{ width: "200px" }}>
                    {item.width == null ? "No width " : item.width} x{" "}
                    {item.height}
                  </td>

                  <td>{item.speed}</td>
                  {item.speed_flag === true ? (
                    <td>{`True`}</td>
                  ) : (
                    <td>{`False`}</td>
                  )}
                  {item.image_height_flag === true ? (
                    <td>{`True`}</td>
                  ) : (
                    <td>{`False`}</td>
                  )}
                  {item.analyzed === true ? <th>{`Yes`}</th> : <th>{`No`}</th>}

                  <td>{item.created_at}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div>
          <h3 className="data_nout_found">Dtata Not Found</h3>
        </div>
      )}

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={listingData.length}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  nextPage,
  prevPage,
  currentPage,
}) => {
  const pageNumbers = Math.ceil(totalItems / itemsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={prevPage}
            className="page-link"
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: pageNumbers }, (_, i) => (
          <li
            key={i + 1}
            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
          >
            <button onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={nextPage}
            className="page-link"
            disabled={currentPage === pageNumbers}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ImageListing;
