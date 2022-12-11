import { FormEvent, FormEventHandler, useState } from "react";
import "./App.scss";
import Card from "./components/Card";

export interface cardType {
	name: string;
	cardNum: string;
	date: { month: string; year: string };
	cvc: string;
}

function Form({ cardInfo }: { cardInfo: Function }) {
	const [name, setName] = useState("");
	const [cardNum, setCardNum] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const handleForm: FormEventHandler = (e) => {
		e.preventDefault();
		cardInfo();
	};

	return (
		<form onSubmit={handleForm} className="inputform">
			<div className="name wrapper">
				<label htmlFor="name">Cardholder Name</label>
				<input
					type="text"
					name="name"
					value={name}
					placeholder="e.g. Jane Appleseed"
					onChange={(e) => setName(() => e.target.value)}
				/>
				{/* {nameErr ? <div className="error">Can't be blank</div> : null} */}
			</div>
			<div className="cardnum wrapper">
				<label htmlFor="cardnum">Cardholder Name</label>
				<input
					type="text"
					name="cardnum"
					value={cardNum}
					placeholder="e.g. 1234 5678 9123 0000"
					onChange={(e) => setCardNum(() => e.target.value)}
				/>
				{/* <div className="error">Wrong format, numbers only</div> */}
			</div>
			<div className="wrapper">
				<label htmlFor="date">Exp. Date (MM/YY)</label>
				<div className="expdate">
					<input
						className="date month"
						size={4}
						type="text"
						name="date"
						value={month}
						placeholder="MM"
						onChange={(e) => setMonth(() => e.target.value)}
					/>
					<input
						className="date year"
						size={4}
						type="text"
						name="date"
						value={year}
						placeholder="YY"
						onChange={(e) => setYear(() => e.target.value)}
					/>
				</div>
				{/* <div className="error">Can't be blank</div> */}
			</div>
			<div className="wrapper">
				<label htmlFor="cvc">Cvc</label>
				<input
					className="cvc"
					type="text"
					maxLength={3}
					name="cvc"
					value={cvc}
					placeholder="e.g. 123"
					onChange={(e) => setCvc(() => e.target.value)}
				/>
				{/* <div className="error">Can't be blank</div> */}
			</div>
			<button className="submit" type="submit">
				Confirm
			</button>
		</form>
	);
}

function App() {
	const [cardData, setCardData] = useState({
		name: "Jane Appleseed",
		cardNum: "1234567891230000",
		date: { month: "00", year: "00" },
		cvc: "123",
	});

	const cardInfo = (cardStuff: cardType) => {
		setCardData(cardStuff);
	};

	return (
		<main className="app">
			<Card {...cardData} />
			<Form cardInfo={cardInfo} />
		</main>
	);
}

export default App;
