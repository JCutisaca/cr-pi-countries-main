import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../Redux/actions";

const DetailCard = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const country = useSelector(state => state.countryDetail)
    useEffect(() => {
        dispatch(getCountryDetail(id))
    }, [])

    return (
        <div>
            <h2>{country.id}</h2>
            <h2>{country.name}</h2>
            <img src={country.flag} alt={country.flag} />
            <h2>{country.continents}</h2>
            <h2>{country.capital}</h2>
            <h2>{country.subregion}</h2>
            <h2>{country.area}</h2>
            <h2>{country.population}</h2>
            <h2>{country.activities}</h2>
        </div>
    )
}

export default DetailCard;