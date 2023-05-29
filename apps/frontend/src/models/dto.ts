import type { Pokemon } from "./pokemon";

/**
 * DTO (Data Transfer Objects) are types defined by the (external) API
 */

export type ApiGetResponse = {
    "pokemons/[id]": Pokemon;
};
export type ApiPostRequest = {
    pokemons: CreatePokemonRequest;
};
export type ApiPostResponse = {
    pokemons: Pokemon;
};

type CreatePokemonRequest = Omit<Pokemon, "id">;
