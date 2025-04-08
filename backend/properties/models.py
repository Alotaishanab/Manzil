import uuid
from django.contrib.gis.db import models
from django.contrib.auth.models import PermissionsMixin, AbstractBaseUser
from django.utils import timezone
from django.db.models import F
from django.db import transaction
from account.models import User  # Ensure this path is correct
from django.contrib.postgres.fields import ArrayField, JSONField
from django.conf import settings
import jwt

# New choices for rent duration and commission
RENT_DURATION_CHOICES = [
    ('monthly', 'Monthly'),
    ('quarterly', 'Quarterly'),
    ('semi_annual', 'Semi-Annual'),
    ('annual', 'Annual'),
]

COMMISSION_CHOICES = [
    (0.5, '0.5%'),
    (1.0, '1.0%'),
    (1.5, '1.5%'),
    (2.0, '2.0%'),
    (2.5, '2.5%'),
]

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

    OWNERSHIP_TYPE_CHOICES = [
        ('independent', 'Independent'),
        ('multipleOwners', 'Multiple Owners'),
        ('agency', 'Agency')
    ]

    # Basic property info
    property_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    property_category = models.CharField(max_length=50, choices=PROPERTY_CATEGORY_CHOICES)
    property_age = models.IntegerField(blank=True, null=True)

    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    area = models.DecimalField(max_digits=10, decimal_places=2, help_text="Size in square meters")

    price_per_meter = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    location = models.CharField(max_length=255, blank=True, null=True)
    coordinates = models.PointField()
    listing_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, blank=True, null=True)

    ownership_type = models.CharField(max_length=50, choices=OWNERSHIP_TYPE_CHOICES)

    contact_information = models.TextField(blank=True, null=True)

    # Media fields
    property_images = ArrayField(models.TextField(), blank=True, null=True)
    property_videos = ArrayField(models.TextField(), blank=True, null=True, size=3)

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
    storage_capacity = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    number_of_units = models.IntegerField(blank=True, null=True)

    # Additional Fields
    property_features = models.JSONField(blank=True, null=True)
    ad_id = models.IntegerField(null=True, blank=True)
    ad_license_number = models.CharField(max_length=100, blank=True, null=True)
    unified_number_of_establishment = models.CharField(max_length=100, blank=True, null=True)
    fal_license_number = models.CharField(max_length=100, blank=True, null=True)
    fal_registration_date = models.DateTimeField(blank=True, null=True)
    advertiser_info = models.JSONField(blank=True, null=True)
    similar_properties = models.JSONField(blank=True, null=True)

    # Draft Fields
    is_draft = models.BooleanField(default=True)
    current_step = models.IntegerField(default=1)

    # New fields (your additions)
    rent_duration = models.CharField(
        max_length=20,
        choices=RENT_DURATION_CHOICES,
        blank=True,
        null=True,
        help_text="Rental period (e.g., Monthly, Quarterly, Semi-Annual, Annual)"
    )
    commission = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        choices=COMMISSION_CHOICES,
        blank=True,
        null=True,
        help_text="Commission percentage (from 0.5% to 2.5% in 0.5% increments)"
    )
    floor_plan = models.FileField(
        upload_to='floor_plans/',
        blank=True,
        null=True,
        help_text="Upload the floor plan file or image"
    )
    main_image_index = models.IntegerField(
        default=0,
        help_text="Index of the main image/video to display first"
    )

    # New fields for tracking views
    view_count = models.IntegerField(default=0)  # Track the number of views
    total_view_duration = models.IntegerField(default=0)  # Track total duration in seconds

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(property_age__gte=0) & models.Q(property_age__lte=99),
                name="check_property_age_range"
            ),
            models.CheckConstraint(check=models.Q(property_videos__len__lte=3), name="chk_property_videos")
        ]

    def save(self, *args, **kwargs):
        if self.area and self.price:
            self.price_per_meter = self.price / self.area
        super().save(*args, **kwargs)

    def increment_view_count(self):
        """Increments the view count by 1."""
        self.view_count = F('view_count') + 1
        self.save(update_fields=['view_count'])

    def add_to_total_duration(self, duration):
        """Adds the duration to the total view duration."""
        self.total_view_duration = F('total_view_duration') + duration
        self.save(update_fields=['total_view_duration'])

    def __str__(self):
        return f"{self.title} - {self.property_type}"


class PropertyView(models.Model):
    view_id = models.AutoField(primary_key=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='views')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    view_date = models.DateTimeField(auto_now_add=True)
    duration_seconds = models.IntegerField(null=True, blank=True)
    geo_location = models.PointField(null=True, blank=True)

    def __str__(self):
        return f"View on {self.property} by {self.user or 'Guest ' + self.guest_id}"


class PropertyShare(models.Model):
    share_id = models.AutoField(primary_key=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='shares')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    share_date = models.DateTimeField(auto_now_add=True)
    platform = models.CharField(max_length=50)

    def __str__(self):
        return f"Share of {self.property} by {self.user or 'Guest ' + self.guest_id}"


class PropertyClick(models.Model):
    click_id = models.AutoField(primary_key=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='clicks')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    click_date = models.DateTimeField(auto_now_add=True)
    click_type = models.CharField(max_length=50)

    def __str__(self):
        return f"Click on {self.property} by {self.user or 'Guest ' + self.guest_id}"


class PropertyInquiry(models.Model):
    inquiry_id = models.AutoField(primary_key=True)
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    inquiry_date = models.DateTimeField(auto_now_add=True)
    inquiry_type = models.CharField(max_length=50)
    inquiry_details = models.TextField(blank=True)

    def __str__(self):
        return f"Inquiry on {self.property} by {self.user or 'Guest ' + self.guest_id}"


class SavedProperties(models.Model):
    saved_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_properties')
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='saved_by_users')
    saved_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')

    def __str__(self):
        return f"User {self.user_id} saved Property {self.property_id} on {self.saved_date}"


# New Models for Tracking User Actions

class SearchLog(models.Model):
    search_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    search_query = models.CharField(max_length=255)
    filters = models.JSONField(blank=True, null=True)
    search_date = models.DateTimeField(auto_now_add=True)
    geo_location = models.PointField(null=True, blank=True)

    def __str__(self):
        return f"Search '{self.search_query}' by {self.user or 'Guest ' + self.guest_id} on {self.search_date}"


class ScrollLog(models.Model):
    scroll_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    guest_id = models.CharField(max_length=255, null=True, blank=True)
    time_diff = models.IntegerField(help_text="Time spent scrolling in seconds")
    scroll_date = models.DateTimeField(auto_now_add=True)
    geo_location = models.PointField(null=True, blank=True)

    def __str__(self):
        return f"Scroll for {self.user or 'Guest ' + self.guest_id} - {self.time_diff} seconds on {self.scroll_date}"
