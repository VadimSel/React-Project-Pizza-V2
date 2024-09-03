import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../App";
import { Categories } from "../components/Categories";
import Pagination from "../components/Pagination";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Sort } from "../components/Sort";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const { status, items } = useSelector((state) => state.pizza);
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

    const { searchValue } = useContext(SearchContext);
    // const [ items, setitems] = useState([])
    // const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    const getPizzas = async () => {
        // setIsLoading(true);

        const order = sort.sortProperty.includes("-") ? "asc" : "desc";
        const sortBy = sort.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        //     await axios
        //         .get(
        //             `https://66c9fd0759f4350f064e1891.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        //         )
        //         .then((res) => {
        //             setItems(res.data);
        //             setIsLoading(false);
        //         })
        //         .catch((error) => {
        //             setItems([]);
        //             setIsLoading(false);
        //         });
        //     window.scrollTo(0, 0);
        // };

        dispatch(
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage,
            })
        );

        window.scrollTo(0, 0);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        getPizzas();
    }, []);

    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
    // const pizzas = Array.isArray(items)
    //     ? items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    //     : [];
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Произошла ошибка 😕</h2>
                    <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
                    {/* <p>Всё сломалось, никаких пицц</p> */}
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletons : pizzas}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
};

export default Home;
