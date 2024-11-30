import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../scss/components/_full-pizza.scss";

type pizzaType = {
	imageUrl: string;
	title: string;
	price: number;
};

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<pizzaType>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					"https://66c9fd0759f4350f064e1891.mockapi.io/items/" + id
				);
				setPizza(data);
			} catch (error) {
				alert("Ошибка при получении пиццы!");
				navigate("/");
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return "Загрузка...";
	}

	return (
		<div className="container">
			<div className="container__fullPizza">
				<div className="container__fullPizza-imageContainer">
					<img src={pizza.imageUrl} className="container__fullPizzaImage" />
				</div>
				<div className="container__content">
					<div className="container__titleAndPrice">
						<h2>{pizza.title}</h2>
						<h4>{pizza.price} ₽</h4>
					</div>
					<Link to={"/"}>
						<button className="button button--outline button--add">
							<span>Назад</span>
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FullPizza;
