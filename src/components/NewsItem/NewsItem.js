import React from "react";
import { Button, Card, CardImg } from "react-bootstrap";
import "./NewsItem.css";

const NewsItem = ({
    imageUrl,
    alt,
    description,
    title,
    author,
    category,
    date,
    urlNews,
}) => {
    const formatCategory = (category) =>
        `Category: ${!category ? "Unknown" : category}`;
    const formatAuthor = (author) => `Author: ${!author ? "Unknown" : author}`;
    const formatPublishedAt = (date) =>
        `Published at: ${new Date(date).toGMTString()}`;

    return (
        <Card className="card">
            <CardImg
                className="card-img"
                variant="top"
                src={imageUrl}
                alt={alt}
            />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="card-text">{description}</Card.Text>
                <details className="detail">
                    <p className="summary">Category, Author and Date</p>
                    <p className="text">{formatCategory(category)}</p>
                    <p className="text">{formatAuthor(author)}</p>
                    <p className="text">{formatPublishedAt(date)}</p>
                </details>
                <Button className="primary" href={urlNews} target="_blank">
                    Read more →
                </Button>
            </Card.Body>
        </Card>
    );
};

export default NewsItem;
