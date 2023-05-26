from django.db import models


class Pokemon(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False)
    ip = models.GenericIPAddressField(null=True, verbose_name="Creator's IP")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "pokemons"

    def __str__(self) -> str:
        return self.name
