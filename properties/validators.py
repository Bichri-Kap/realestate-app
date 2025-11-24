from django.core.exceptions import ValidationError


def validate_image_file(image_file):
    valid_types = ['image/jpeg', 'image/png']
    max_size = 5 * 1024 * 1024  # 5MB

    if image_file.content_type not in valid_types:
        raise ValidationError("Unsupported file type. Only JPEG and PNG are allowed.")
    if image_file.size > max_size:
        raise ValidationError("Image too large. Max 5MB allowed.")
