from django.contrib.gis.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django.contrib.gis.db.models import PointField  # For geographic coordinates
from account.models import User  # Import the custom User model from the account app


class Property(models.Model):
    PROPERTY_TYPES = [
        ('short_term_rent', 'Short Term Rent'),
        ('long_term_rent', 'Long Term Rent'),
        ('for_sale', 'For Sale'),
        ('land_rent', 'Land Rent'),
        ('land_sale', 'Land Sale'),
    ]

    PROPERTY_CATEGORY_CHOICES = [
        ('House', 'House'),
        ('Shop', 'Shop'),
        ('Office', 'Office'),
        ('Apartment', 'Apartment'),
        ('Tower', 'Tower'),
        ('Chalet', 'Chalet'),
        ('Warehouse', 'Warehouse'),
        ('Workers Residence', 'Workers Residence'),
        ('Land', 'Land'),
        ('Farmland', 'Farmland'),
    ]

    STATUS_CHOICES = [
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('sold', 'Sold'),
        ('rented', 'Rented'),
    ]

    # Basic property info
    property_id = models.AutoField(primary_key=True)
    # Reference to the custom User model
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # agency = models.ForeignKey('agencies.Agency', null=True, blank=True,
    #                            on_delete=models.SET_NULL)  # Nullable if no agency
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    property_category = models.CharField(
        max_length=50, choices=PROPERTY_CATEGORY_CHOICES)
    property_age = models.IntegerField(blank=True, null=True)

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_meter = models.DecimalField(
        max_digits=10, decimal_places=2, editable=False)  # Calculated
    location = models.CharField(max_length=255)
    coordinates = PointField()  # Geographic coordinates (lat/lon)
    listing_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50, choices=STATUS_CHOICES, blank=True, null=True)
    contact_information = models.TextField(blank=True, null=True)

    # Media fields
    property_images = ArrayField(models.TextField(), blank=False)
    property_videos = ArrayField(
        models.TextField(), blank=True, null=True, size=3)

    # Featured fields
    is_featured = models.BooleanField(default=False)
    featured_until = models.DateTimeField(blank=True, null=True)

    # Common Residential Fields
    bedrooms = models.IntegerField(blank=True, null=True)
    bathrooms = models.IntegerField(blank=True, null=True)
    has_water = models.BooleanField(default=False)
    has_electricity = models.BooleanField(default=False)
    has_sewage = models.BooleanField(default=False)
    direction = models.CharField(max_length=10, choices=[
        ('North', 'North'),
        ('South', 'South'),
        ('East', 'East'),
        ('West', 'West'),
    ], blank=True, null=True)

    # Type-Specific Fields
    floors = models.IntegerField(blank=True, null=True)
    living_rooms = models.IntegerField(blank=True, null=True)
    rooms = models.IntegerField(blank=True, null=True)
    floor_number = models.IntegerField(blank=True, null=True)
    number_of_streets = models.IntegerField(blank=True, null=True)
    foot_traffic = models.CharField(max_length=10, choices=[
        ('High', 'High'),
        ('Medium', 'Medium'),
        ('Low', 'Low'),
    ], blank=True, null=True)
    proximity = models.CharField(max_length=50, blank=True, null=True)
    parking_spaces = models.IntegerField(blank=True, null=True)
    number_of_gates = models.IntegerField(blank=True, null=True)
    loading_docks = models.IntegerField(blank=True, null=True)
    storage_capacity = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    number_of_units = models.IntegerField(blank=True, null=True)

    # Additional Fields
    property_features = models.JSONField(blank=True, null=True)
    ad_id = models.IntegerField(null=True, blank=True)
    ad_license_number = models.CharField(max_length=100, blank=True, null=True)
    unified_number_of_establishment = models.CharField(
        max_length=100, blank=True, null=True)
    fal_license_number = models.CharField(
        max_length=100, blank=True, null=True)
    fal_registration_date = models.DateTimeField(blank=True, null=True)
    advertiser_info = models.JSONField(blank=True, null=True)
    similar_properties = models.JSONField(blank=True, null=True)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(property_age__gte=0) & models.Q(
                    property_age__lte=99),
                name="check_property_age_range"
            ),
            models.CheckConstraint(check=models.Q(
                property_videos__len__lte=3), name="chk_property_videos")
        ]

    # def save(self, *args, **kwargs):
    #     # Automatically calculate price_per_meter before saving
    #     if self.area and self.price:
    #         self.price_per_meter = self.price / self.area
    #     super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} - {self.property_type}"
