import django_filters
from django.db.models import Q
from .models import Property, PropertyFeature


class PropertyFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method="filter_search")
    # Price filters (works for rent & sale)
    min_price = django_filters.NumberFilter(method="filter_min_price")
    max_price = django_filters.NumberFilter(method="filter_max_price")

    # Numeric minimum filters
    min_bedrooms = django_filters.NumberFilter(field_name="bedrooms", lookup_expr="gte")
    min_bathrooms = django_filters.NumberFilter(field_name="bathrooms", lookup_expr="gte")
    min_parking = django_filters.NumberFilter(field_name="parking", lookup_expr="gte")

    # Size filters
    min_floor_size = django_filters.NumberFilter(field_name="floor_size", lookup_expr="gte")
    max_floor_size = django_filters.NumberFilter(field_name="floor_size", lookup_expr="lte")

    min_erf_size = django_filters.NumberFilter(field_name="erf_size", lookup_expr="gte")
    max_erf_size = django_filters.NumberFilter(field_name="erf_size", lookup_expr="lte")

    # Boolean flags
    pet_friendly = django_filters.BooleanFilter()
    pool = django_filters.BooleanFilter()
    garden = django_filters.BooleanFilter()
    flatlet = django_filters.BooleanFilter()

    on_show = django_filters.BooleanFilter()
    on_auction = django_filters.BooleanFilter()
    repossessed = django_filters.BooleanFilter()
    retirement = django_filters.BooleanFilter()
    estate = django_filters.BooleanFilter()
    cluster = django_filters.BooleanFilter()

    # Features (ManyToMany)
    features = django_filters.ModelMultipleChoiceFilter(
        field_name="features",
        queryset=PropertyFeature.objects.all(),
    )

    def filter_min_price(self, queryset, name, value):
        return queryset.filter(
            Q(price__gte=value) | Q(rent_amount__gte=value)
        )

    def filter_max_price(self, queryset, name, value):
        return queryset.filter(
            Q(price__lte=value) | Q(rent_amount__lte=value)
        )

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) |
            Q(description__icontains=value) |
            Q(city__icontains=value) |
            Q(address__icontains=value) |
            Q(area__name__icontains=value) |
            Q(province__name__icontains=value)
        )

    class Meta:
        model = Property
        fields = [
            "listing_type",
            "property_type",
            "availability_status",
            "province",
            "area",
            "agent",
        ]
