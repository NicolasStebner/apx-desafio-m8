import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	atom,
	useRecoilState,
	useRecoilValue,
	selector,
	useSetRecoilState,
} from "recoil";

const queryState = atom({
	key: "query",
	default: "",
});

const resultsState = selector({
	key: "searchResults",
	get: async ({ get }) => {
		const valorDeQuery = get(queryState);
		if (valorDeQuery) {
			const response = await fetch(
				"https://api.mercadolibre.com/sites/MLA/search?q=" + valorDeQuery
			);
			const json = await response.json();
			return json.results;
		} else {
			return [];
		}
	},
});

export function useSearchResults() {
	const params = useParams();
	const query = params.query;
	//1 - escuchar la URL(params)

	//3 -
	const setRecoilQueryValue = useSetRecoilState(queryState);
	const results = useRecoilValue(resultsState);

	//2 - Avisarle a recoilt(useEffect)
	useEffect(() => {
		setRecoilQueryValue(query);
	}, [query]);

	return results;
}
