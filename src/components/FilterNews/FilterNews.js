import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import HttpService from "../../services/httpService";

const FilterNews = (props) => {
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filterSources, setFilterSources] = useState("");
  const [filterCategories, setFilterCategories] = useState("");
  const [filterAuthors, setFilterAuthors] = useState("");
  const [filterString, setFilterString] = useState("");
  const [date, setDate] = useState("");

  const filterData = () => {
    setFilterString(
      `source_id=${filterSources}&category=${filterCategories}&author=${filterAuthors}&date=${date}`
    );
    props.setFilter(filterString);
  };

  const fetchFilterData = (source = "") => {
    try {
      const request = source
        ? HttpService.get(`news/filters?sourceId=${source}`, "", true)
        : HttpService.get(`news/filters`, "", true);
      request.then((response) => {
        const parsedData = response.data.data;
        setCategories(parsedData.categories);
        setAuthors(parsedData.authors);
        const preferredSources = parsedData.preferred_sources.split(",");
        const preferredCategories = parsedData.preferred_categories.split(",");
        const preferredAuthors = parsedData.preferred_authors.split(",");
        if (parsedData.preferred_sources) {
          setFilterSources(preferredSources);
        }
        if (parsedData.preferred_categories) {
          setFilterCategories(preferredCategories);
        }
        if (parsedData.preferred_authors) {
          setFilterAuthors(preferredAuthors);
        }
        setFilterString(
          `source_id=${preferredSources}&category=${preferredCategories}&author=${preferredAuthors}&date=${date}`
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFilterData();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterString]);

  return (
    <Container>
      <Form>
        <Row>
          <Col sm={12} md={3} lg={3} xl={3}>
            <FormGroup controlId="formGridSource">
              <FormLabel>Select Source</FormLabel>
              <FormControl
                as="select"
                onChange={(e) => {
                  setFilterSources(
                    [].slice
                      .call(e.target.selectedOptions)
                      .map((item) => item.value)
                  );
                  fetchFilterData(e.target.value);
                }}
              >
                <option value="1" selected={filterSources.includes("1")}>
                  NewsAPI
                </option>
                <option value="2" selected={filterSources.includes("2")}>
                  Guardian
                </option>
                <option value="3" selected={filterSources.includes("3")}>
                  New York Times
                </option>
              </FormControl>
            </FormGroup>
          </Col>

          <Col sm={12} md={3} lg={3} xl={3}>
            <FormLabel>Select Category</FormLabel>
            <FormControl
              as="select"
              onChange={(e) =>
                setFilterCategories(
                  [].slice
                    .call(e.target.selectedOptions)
                    .map((item) => item.value)
                )
              }
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  selected={filterCategories.includes(category)}
                >
                  {category}
                </option>
              ))}
            </FormControl>
          </Col>
          <Col sm={12} md={3} lg={3} xl={3}>
            <FormLabel>Select Author</FormLabel>
            <FormControl
              as="select"
              onChange={(e) =>
                setFilterAuthors(
                  [].slice
                    .call(e.target.selectedOptions)
                    .map((item) => item.value)
                )
              }
            >
              {authors.map((author) => (
                <option
                  key={author}
                  value={author}
                  selected={filterAuthors.includes(author)}
                >
                  {author}
                </option>
              ))}
            </FormControl>
          </Col>
          <Col sm={12} md={3} lg={3} xl={3}>
            <FormLabel>Select Date</FormLabel>
            <FormControl
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm={12} md={4}>
            <Button
              className="my-4 w-100"
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                filterData();
              }}
            >
              Filter News
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FilterNews;
