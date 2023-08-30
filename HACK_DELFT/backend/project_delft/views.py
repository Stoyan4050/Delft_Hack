from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RoleSerializer
from .models import Role
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import NFT
from django.http import JsonResponse
from django.core.files.storage import default_storage

import json

# Create your views here.

ADDRESS = None
PUBLIC_KEY = None


class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()
#

#@action(detail=False, methods=['POST'], url_path='nft-clicked')
def nft_clicked(request):
    if request.method == 'POST':
        nft_data = json.loads(request.body.decode('utf-8'))

        # Create a new NFT instance and save it to the database
        nft_instance = NFT(
            name=nft_data.get('name'),
            author=nft_data.get('author'),
            image=nft_data.get('image'),
            current_bid=nft_data.get('currentbid')
        )
        nft_instance.save()

        return JsonResponse({"message": "NFT data saved successfully!"}, status=201)

    return JsonResponse({"error": "Invalid request method"}, status=400)


def get_address_PK(request):
    global ADDRESS, PUBLIC_KEY

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        address = data.get('address')
        publicKey = data.get('publicKey')

        print("Received address:", address)
        print("Received publicKey:", publicKey)

        ADDRESS = address
        PUBLIC_KEY = publicKey

        return JsonResponse({"message": "Data received successfully!"})

    return JsonResponse({"error": "Invalid request method"}, status=400)

def get_NFT_data(request, *args, **kwargs):
    # Extract the form data from the POST request
    location = request.POST.get('location')
    description = request.POST.get('description')
    additional_description = request.POST.get('additional_description')
    total_amount = request.POST.get('total_amount')
    type_retailer = request.POST.get('type_retailer')
    retailer_address = request.POST.get('retailer_address')

    # Handle the uploaded documents
    documents = []
    file_urls = []
    for key in request.FILES:
        document = request.FILES[key]
        documents.append(document)
        file_name = default_storage.save(document.name, document)
        file_url = default_storage.url(file_name)
        file_urls.append(file_url)

    print(location)
    print(description)
    print(documents)
    print(file_urls)
    # Return a JSON response
    return JsonResponse({"status": "success", "message": "Form data received successfully!"})