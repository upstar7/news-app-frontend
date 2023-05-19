import { Form, FormControl, Button } from "react-bootstrap";
import React, { useState } from "react";

const SearchNews = (props) => {
    const [search, setSearch] = useState("");

    return (
        <Form className="d-flex my-4">
            <FormControl
                type="text"
                placeholder="Type Search Term..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <Button
                className="ml-2"
                variant="primary"
                onClick={() => {
                    props.searchNews(search);
                }}
            >
                Search
            </Button>
        </Form>
    );
};

export default SearchNews;
