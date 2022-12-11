import "./Card.scss";

import cardLogo from "../assets/images/card-logo.svg";

import type { cardType } from "../App";

interface frontCard {
	name?: string;
	cardNum?: string;
	expireDate?: {
		month?: string;
		year?: string;
	};
}

export function FrontCard({
	name = "Jane Appleseed",
	cardNum = "1234567891230000",
	expireDate = {
		month: "00",
		year: "00",
	},
}: frontCard) {
	const cardNumSpace = cardNum.match(/.{1,4}/g);

	return (
		<div className="frontcard card">
			<img className="cardlogo" src={cardLogo} alt="Card Logo" />
			<div className="cardnum">{cardNumSpace?.join(" ")}</div>
			<div className="name">{name}</div>
			<div className="expiredate">
				{expireDate.month}/{expireDate.year}
			</div>
		</div>
	);
}

interface backCard {
	cvc?: string;
}

export function BackCard({ cvc = "123" }: backCard) {
	return (
		<div className="backcard card">
			<div className="backnum">{cvc}</div>
		</div>
	);
}

export default function Card(props: cardType) {
	const frontCardData: frontCard = {
		name: props.name,
		cardNum: props.cardNum,
		expireDate: props.date,
	};
	return (
		<section className="cardsection">
			<FrontCard {...frontCardData} />
			<BackCard cvc={props.cvc} />
		</section>
	);
}
