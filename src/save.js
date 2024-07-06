import { useBlockProps } from "@wordpress/block-editor";
import penguinLogo from "./images/penguin-logo.svg";
import "./style.scss";

export default function save({ attributes }) {
	const { bookData, title } = attributes;
	console.log(bookData);
	return (
		<div {...useBlockProps.save()}>
			<div className="bestseller-block">
				<h2>{title}</h2>
				<div className="book-cover">
					<img src={bookData.cover_image} alt={bookData.title} />
				</div>
				<h3>{bookData.title}</h3>
				<p>{bookData.author}</p>
				<a href={bookData.amazonLink} className="buy-button">
					Buy from Amazon
				</a>
				<a href={bookData.penguinLink} className="penguin-link">
					<div className="penguin-link-bg">
						<img src={penguinLogo} alt="Penguin Logo" />
					</div>
				</a>
			</div>
		</div>
	);
}
