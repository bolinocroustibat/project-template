import api from "../../../helpers/api";

export function load({ fetch, params }) {
    return {
        post: api.get("pokemons/[id]", {
            params: { id: params.id },
            ssrCache: 30,
            fetch,
        }),
    };
}
