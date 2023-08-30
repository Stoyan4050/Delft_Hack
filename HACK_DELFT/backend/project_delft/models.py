from django.db import models

# Create your models here.

class Role(models.Model):
    role = models.CharField(max_length=120)
    address = models.TextField()

    # def _str_(self):
    #     return self.title

class NFT(models.Model):
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    image = models.URLField()  # Assuming you're sending a URL for the image
    current_bid = models.CharField(max_length=50)  # You might want to use DecimalField if you're dealing with exact amounts

    def __str__(self):
        return self.name

class NFT_address(models.Model):
    address = models.CharField(max_length=255)