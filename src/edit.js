import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { useState, useEffect } from "react";
import Select from "react-select";
import "./editor.scss";
import penguinLogo from "./images/penguin-logo.svg";
import bookCover from "./images/book-cover.jpg";

export default function Edit({ attributes, setAttributes }) {
	const { genre, bookData, title } = attributes;
	const [genres, setGenres] = useState([]);
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Fetch genres from the API
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const response = await fetch("https://freetestapi.com/api/v1/books");
				const data = await response.json();
				const genreOptions = Array.from(
					new Set(data.flatMap((book) => book.genre)),
				).map((genre) => ({
					value: genre,
					label: genre,
				}));
				setGenres(genreOptions);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching genres:", error);
				setLoading(false);
			}
		};

		fetchGenres();
	}, []);

	const fetchBooksByGenre = async (selectedGenre) => {
		try {
			const response = await fetch("https://freetestapi.com/api/v1/books");
			const data = await response.json();
			const filteredBooks = data.filter((book) =>
				book.genre.includes(selectedGenre),
			);
			setBooks(filteredBooks);
		} catch (error) {
			console.error("Error fetching books:", error);
		}
	};

	const onChangeGenre = (selectedGenre) => {
		setAttributes({ genre: selectedGenre.value });
		fetchBooksByGenre(selectedGenre.value);
	};

	const onChangeBook = (selectedBook) => {
		setAttributes({ bookData: selectedBook });
	};
	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
	return (
		<div {...useBlockProps()}>
			<InspectorControls>
				<PanelBody title={__("Genre", "bestseller-block")}>
					{loading ? (
						<p>{__("Loading genres...", "bestseller-block")}</p>
					) : (
						<Select
							label={__("Select Genre", "bestseller-block")}
							value={genres.find((g) => g.value === genre) || null}
							options={genres}
							onChange={onChangeGenre}
						/>
					)}
				</PanelBody>
				<PanelBody title={__("Books", "bestseller-block")}>
					{genre && books.length > 0 && (
						<Select
							label={__("Select Book", "bestseller-block")}
							value={
								bookData ? { value: bookData.id, label: bookData.title } : null
							}
							options={books.map((book) => ({
								value: book.id,
								label: book.title,
							}))}
							onChange={(selectedOption) => {
								const selectedBook = books.find(
									(book) => book.id === selectedOption.value,
								);
								onChangeBook(selectedBook);
							}}
						/>
					)}
				</PanelBody>
			</InspectorControls>
			<div className="bestseller-block">
				<RichText
					tagName="h2"
					value={title}
					onChange={onChangeTitle}
					placeholder={__("Enter title", "bestseller-block")}
					className="bestseller-title"
				/>
				{bookData ? (
					<>
						<div className="book-cover">
							<img
								src={bookData.cover_image || bookCover}
								alt={bookData.title}
							/>
						</div>
						<h3>{bookData.title}</h3>
						<p>{bookData.author}</p>
						<button className="buy-button">Buy from Amazon</button>
						<a href={bookData.penguinLink} className="penguin-link">
							<div className="penguin-link-bg">
								<img src={penguinLogo} alt="Penguin Logo" />
							</div>
						</a>
					</>
				) : (
					<p>Select a genre and book to see details</p>
				)}
			</div>
		</div>
	);
}
