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
from .web3 import *
from .models import NFT_address
from rest_framework.response import Response
from .accounts import *
from .XRP import *
import os

import json

# Create your views here.

ADDRESS = None
PUBLIC_KEY = None


class RoleView(viewsets.ModelViewSet):
    serializer_class = RoleSerializer
    queryset = Role.objects.all()


#

# @action(detail=False, methods=['POST'], url_path='nft-clicked')
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

def send_transaction(request):

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        amount = data.get('amount')
        address = data.get("address")

        address = address["issuer"]
        print("AMOUNT: ", amount)
        print("Address: ", address)

        seed = get_donator()
        wallet = generateWalletFromSeed(seed)
        pay_and_submit(wallet, float(amount), address)

        return JsonResponse({"message": "Data received successfully!"})

    return JsonResponse({"error": "Invalid request method"}, status=400)

def get_NFT_data(request, *args, **kwargs):
    # Extract the form data from the POST request
    location = request.POST.get('location')
    description = request.POST.get('description')
    category = request.POST.get('additional_description')
    total_amount = request.POST.get('total_amount')
    type_retailer = request.POST.get('type_retailer')
    retailer_address = request.POST.get('retailer_address')

    benefit_seed = get_benefit()

    # Handle the uploaded documents
    documents = []
    file_urls = []
    for key in request.FILES:
        document = request.FILES[key]
        documents.append(document)
        file_name = default_storage.save(document.name, document)
        file_url = default_storage.url(file_name)
        file_urls.append(file_url)

    data = {
        "location": location,
        "description": description,
        "category": category,
        "total_amount": total_amount,
        "type_retailer": type_retailer,
        "retailer_address": retailer_address,
    }

    # Add individual document keys based on the elements in the file_urls list
    for index, file_url in enumerate(file_urls, start=1):
        key_name = f"document{index}"
        data[key_name] = file_url

    # Convert JSON object to string
    json_str = json.dumps(data)
    print(json_str)
    # Hex-encode the JSON string
    hex_encoded_json = hex_encode(json_str)

    print(f"Hex-encoded JSON: {hex_encoded_json}")

    # Calculate the length of the hex-encoded string in bytes
    length_in_bytes = len(bytes.fromhex(hex_encoded_json))

    print(f"Length in bytes: {length_in_bytes}")

    wallet = generateWalletFromSeed(benefit_seed)
    uri = hex_encoded_json

    print(wallet)
    mint_token(wallet, uri)

    # nft_tokens = get_tokens(wallet.address)
    # for token in nft_tokens:
    #     if token['id'] == token_id:
    #         return token

    # Return a JSON response
    return JsonResponse({"status": "success", "message": "Form data received successfully!"})


def get_nfts(request):
    nfts = NFT_address.objects.all()
    list = []

    for nft in nfts:
        response = get_tokens_id(nft.address, nft.nftId)
        hex_encoded_json = response['URI']
        #print(response)
        print(hex_encoded_json)
        # Hex-decode the JSON string
        json_str = hex_decode(hex_encoded_json)
        print("JSON: ", json_str)
        # Convert the JSON string to a Python dictionary
        decoded_data = json.loads(json_str)

        print(f"Decoded Data: {decoded_data}")
        #print(response)
        decoded_data["issuer"] = response['Issuer']
        print(response['Issuer'])
        issuer_balance = get_account_info(response['Issuer'])
        print(issuer_balance)
        decoded_data["amount_left"] = float(decoded_data['total_amount']) - float(issuer_balance)/1000000
        list.append(decoded_data)



    return JsonResponse(list, safe=False)
    # list = []
    # for i in range(10):
    #     # image_url = "djgifjgk"
    #     # description = "jgkfjg"
    #     # address = "fjkgfkgkf"
    #     # retailers="hdhfjdhfj"
    #     data = {
    #         "image_url": "djgifjgk",
    #     "description": "jgkfjg",
    #     "address": "fjkgfkgkf",
    #     "retailers": "hdhfjdhfj"
    #     }
    #     list.append(data)

    # return Response(list)


def hex_encode(s: str) -> str:
    return s.encode('utf-8').hex()

def hex_decode(s: str) -> str:
    return bytes.fromhex(s).decode('utf-8')