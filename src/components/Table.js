import React, { useState, Fragment } from "react";
import { Table as Table1, Pagination } from "react-bootstrap";
import PaginationForm from "./PaginationForm";

export default function Table(props) {
  const [searchText, setSearchText] = useState("");
  const [sortCol, setSortCol] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];
  const [personsPerPage, setPersonsPerPage] = useState(3);
  const [pageNumberLimit, setPageNumberLimit] = useState(2);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(2);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  ///searchtext
  const searchPerson = (e) => {
    setSearchText(e.target.value);
  };

  ///filtering
  const filter = () => {
    return props.users.filter((person) => {
      return ["firstName", "lastName", "age", "gender"].some((key) => {
        return (person[key] + "")
          .toLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
    });
  };
  let list = searchText === "" ? props.users : filter();

  const sortHandle = (colName) => {
    let sortingOrder = sortCol !== colName ? "" : sortOrder;
    setSortOrder(sortingOrder == "asc" ? "desc" : "asc");
  };
  const sort = (a, b) => (a[sortCol] + "").localeCompare(b[sortCol] + "");
  const clickSortButton = (name) => {
    sortHandle(name);
    setSortCol(name);
  };
  const sortList = (list) => {
    if (sortCol) {
      let dir = sortOrder || "asc";
      return list.sort((a, b) => {
        if (isNaN || !isNaN(a[sortCol])) {
          return dir == "asc" ? sort(a, b) : sort(b, a);
        } else {
          return dir == "asc"
            ? a[sortCol] - b[sortCol]
            : b[sortCol] - [sortCol];
        }
      });
    }
    return list;
  };
  list = sortList(list);

  //Pagination

  //Get Current Persons
  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = list.slice(indexOfFirstPerson, indexOfLastPerson);

  for (let i = 1; i <= Math.ceil(props.users.length / personsPerPage); i++) {
    pageNumbers.push(i);
  }

  //Pagination EventHandlers

  const paginate = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const nextPage = () => {
    if (currentPage == pageNumbers[pageNumbers.length - 1]) {
      return null;
    }
    setCurrentPage((page) => page + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    console.log("nextPageClicked");
  };

  const prevPage = () => {
    if (currentPage == 1) {
      return null;
    }

    setCurrentPage((page) => page - 1);
    if (currentPage < maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const btnIncrementClick = () => {
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  };
  const btnDecrementClick = () => {
    if (currentPage > 2) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    console.log("btnDecrementClick");
  };

  let pageIncrementBtn = null;
  // if (pageNumbers.length > 2) {
  if (currentPage < pageNumbers.length - 2) {
    pageIncrementBtn = <Pagination.Ellipsis onClick={btnIncrementClick} />;
  }

  let pageDecrementBtn = null;
  if (currentPage >= 2) {
    pageDecrementBtn = <Pagination.Ellipsis onClick={btnDecrementClick} />;
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Pagination>
          <Pagination.Item
            key={number}
            id={number}
            onClick={paginate}
            className={currentPage == number ? "active" : null}
          >
            {pageNumbers[number - 1]}
          </Pagination.Item>
        </Pagination>
      );
    } else {
      return null;
    }
  });
  return (
    <Fragment text-align="center">
      <input
        className="input"
        type="text"
        placeholder="Search Here....."
        onChange={searchPerson}
      />

      <div className="tableCenter">
        <Table1 striped bordered hover className="head">
          <thead>
            <tr className="tableHead">
              <th>#</th>

              <th onClick={() => clickSortButton("firstName")}>
                firstName
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {sortCol === "firstName"
                    ? sortOrder === "asc"
                      ? "🡅"
                      : "🡇"
                    : ""}
                </button>
              </th>
              <th onClick={() => clickSortButton("lastName")}>
                lastName
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {sortCol === "lastName"
                    ? sortOrder === "asc"
                      ? "🡅"
                      : "🡇"
                    : ""}
                </button>
              </th>
              <th onClick={() => clickSortButton("age")}>
                Age
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {sortCol === "age" ? (sortOrder === "asc" ? "🡅" : "🡇") : ""}
                </button>
              </th>
              <th onClick={() => clickSortButton("gender")}>
                Gender
                <button
                  style={{ backgroundColor: "transparent", border: "none" }}
                >
                  {sortCol === "gender"
                    ? sortOrder === "asc"
                      ? "🡅"
                      : "🡇"
                    : ""}
                </button>
              </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentPersons.map((person, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.age}</td>
                <td>{person.gender}</td>
                <td>
                  <button
                    className="edit"
                    style={{ backgroundColor: "green" }}
                    id={person._id}
                    name={person}
                    onClick={(e) => props.edit(e.target.id)}
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  <button
                    className="edit"
                    style={{ backgroundColor: "red" }}
                    id={person._id}
                    name={person}
                    onClick={(e) => props.delete(e.target.id)}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table1>
        <div className="paginate">
          <PaginationForm
            nextPage={nextPage}
            prevPage={prevPage}
            renderPageNumbers={renderPageNumbers}
            pageDecrementBtn={pageDecrementBtn}
            pageIncrementBtn={pageIncrementBtn}
            pageNumbers={pageNumbers}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </Fragment>
  );
}
