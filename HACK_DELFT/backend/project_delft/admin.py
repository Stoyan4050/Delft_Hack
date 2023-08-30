from django.contrib import admin
from .models import Role, NFT

class AdminDelft(admin.ModelAdmin):
    list_display = ('role', 'address')

# Register your models here.

admin.site.register(Role, AdminDelft)
admin.site.register(NFT)