from django.contrib import admin

from pokemons_app.models import Pokemon


@admin.register(Pokemon)
class PokemonAdmin(admin.ModelAdmin):
    readonly_fields = (
        "created_at",
        "updated_at",
        "ip",
    )
    list_display = (
        "id",
        "name",
        "created_at",
        "updated_at",
        "ip",
    )
    ordering = ("-created_at", "-updated_at")
