from django.contrib import admin
from .models import Role, NFT, NFT_address

class AdminDelft(admin.ModelAdmin):
    list_display = ('role', 'address')

# Register your models here.

admin.site.register(Role, AdminDelft)
admin.site.register(NFT)
admin.site.register(NFT_address)