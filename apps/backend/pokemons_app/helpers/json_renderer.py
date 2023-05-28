import orjson
from ninja.renderers import BaseRenderer


class ORJSONRenderer(BaseRenderer):
    """
    JSON Renderer using orjson (around 6 times faster than the default json module)
    """

    media_type = "application/json"

    def render(self, request, data: dict, *, response_status) -> str:
        return orjson.dumps(data)
