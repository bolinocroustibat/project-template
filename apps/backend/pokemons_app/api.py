from typing import Optional

from ninja import NinjaAPI

from django_api.settings import APP_NAME, DESCRIPTION, VERSION
from pokemons_app.helpers.get_client_ip import get_client_ip
from pokemons_app.helpers.json_renderer import ORJSONRenderer
from pokemons_app.models import Pokemon


api = NinjaAPI(
    renderer=ORJSONRenderer(), title=APP_NAME, description=DESCRIPTION, version=VERSION
)


@api.post("/pokemons/", tags=["pokemons"], summary="Post a new pokemon")
async def post_pokemon(request, name: str) -> dict:
    """Create a new Pokemon, save it to the database, and return it as a dict."""
    ip: Optional[str] = get_client_ip(request)
    pokemon = await Pokemon.objects.acreate(name=name, ip=ip)
    return {
        "id": pokemon.pk,
        "name": pokemon.name,
        "createdAt": pokemon.created_at,
        "createdBy": pokemon.ip,
        "updatedAt": pokemon.updated_at,
    }


@api.get("/pokemons/{id}", tags=["pokemons"], summary="Get a pokemon by its ID")
async def get_pokemon(request, id: int) -> dict:
    """Get a Pokemon from the database and return it as a dict."""
    try:
        pokemon = await Pokemon.objects.aget(id=id)
    except Pokemon.DoesNotExist:
        return {"error": "Pokemon not found"}
    except Exception as e:
        return {"error": str(e)}
    return {
        "id": pokemon.pk,
        "name": pokemon.name,
        "createdAt": pokemon.created_at,
        "createdBy": pokemon.ip,
        "updatedAt": pokemon.updated_at,
    }
