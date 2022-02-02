from rest_framework import serializers
from core.utils import is_safe_compound_name


def compound_name_validator(value):
    if not is_safe_compound_name(value):
        raise serializers.ValidationError('This field must be a valid compound name.')
    return value
