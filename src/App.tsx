import { FormEventHandler, useEffect, useState } from "react";
import "./App.scss";
import Card from "./components/Card";

import iconComplete from "./assets/images/icon-complete.svg";

export interface cardType {
	name: string;
	cardNum: string;
	date: { month: string; year: string };
	cvc: string;
}

function Form({ cardInfo }: { cardInfo: Function }) {
	const [formComplete, setFormComplete] = useState(false);
	const [formSubmit, setFormSubmit] = useState(false);

	const [name, setName] = useState("");
	const [cardNum, setCardNum] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const [nameErr, setNameErr] = useState(false);
	const [cardNumErr, setCardNumErr] = useState(false);
	const [dateErr, setDateErr] = useState(false);
	const [cvcErr, setCvcErr] = useState(false);

	const checkValid = () => {
		if (name === "") {
			setNameErr((current) => !current);
		} else {
			setNameErr(false);
		}

		if (cardNum.length < 16 || cardNum.match(/[A-Z,a-z]/g)) {
			setCardNumErr(true);
		} else {
			setCardNumErr(false);
		}

		if (month === "" || year === "") {
			setDateErr(true);
		} else {
			setDateErr(false);
		}

		if (cvc === "") {
			setCvcErr(true);
		} else {
			setCvcErr(false);
		}
	};

	const handleForm: FormEventHandler = (e) => {
		e.preventDefault();

		checkValid();

		let cardData: cardType = {
			name,
			cardNum,
			date: {
				month,
				year,
			},
			cvc,
		};
		cardInfo(cardData);

		setFormSubmit(true);
	};

	useEffect(() => {
		if (nameErr || cardNumErr || dateErr || cvcErr) {
			console.log("There is an error");
			return;
		}
		if (formSubmit) {
			setFormComplete(true);
		}
	}, [nameErr, cardNumErr, dateErr, cvcErr, formSubmit]);

	return (
		<>
			{formComplete ? (
				<div className="complete">
					<img src={iconComplete} alt="Completion Checkmark" />
					<h2>Thank You!</h2>
					<p>We've added you card details</p>
					<button className="continue">Continue</button>
				</div>
			) : (
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
						{nameErr ? <div className="error">Can't be blank</div> : null}
					</div>
					<div className="cardnum wrapper">
						<label htmlFor="cardnum">Card Number</label>
						<input
							type="text"
							name="cardnum"
							maxLength={16}
							value={cardNum}
							placeholder="e.g. 1234 5678 9123 0000"
							onChange={(e) => setCardNum(() => e.target.value)}
						/>
						{cardNumErr ? (
							<div className="error">Wrong format, numbers only</div>
						) : null}
					</div>
					<div className="wrapper">
						<label htmlFor="date">Exp. Date (MM/YY)</label>
						<div className="expdate">
							<input
								className="date month"
								maxLength={2}
								type="text"
								name="date"
								value={month}
								placeholder="MM"
								onChange={(e) => setMonth(() => e.target.value)}
							/>
							<input
								className="date year"
								maxLength={2}
								type="text"
								name="date"
								value={year}
								placeholder="YY"
								onChange={(e) => setYear(() => e.target.value)}
							/>
						</div>
						{dateErr ? <div className="error">Can't be blank</div> : null}
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
						{cvcErr ? <div className="error">Can't be blank</div> : null}
					</div>
					<button className="submit" type="submit">
						Confirm
					</button>
				</form>
			)}
		</>
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
