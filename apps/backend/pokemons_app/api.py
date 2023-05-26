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
def post_pokemon(request, name: str) -> dict:
    """Create a new Pokemon, save it to the database, and return it as a dict."""
    ip: Optional[str] = get_client_ip(request)
    pokemon = Pokemon.objects.create(name=name, ip=ip)
    return {
        "name": pokemon.name,
        "createdAt": pokemon.created_at,
        "updatedAt": pokemon.updated_at,
        "creatorsIp": pokemon.ip,
    }


@api.get("/pokemons/{name}", tags=["pokemons"], summary="Get a pokemon by its name")
def get_pokemon(request, name: str) -> dict:
    """Get a Pokemon from the database and return it as a dict."""
    try:
        pokemon = Pokemon.objects.get(name=name)
    except Pokemon.DoesNotExist:
        return {"error": "Pokemon not found"}
    except Exception as e:
        return {"error": str(e)}
    return {
        "name": pokemon.name,
        "createdAt": pokemon.created_at,
        "updatedAt": pokemon.updated_at,
        "creatorsIp": pokemon.ip,
    }
