from xrpl.clients import JsonRpcClient
from xrpl.wallet import generate_faucet_wallet,Wallet
from xrpl.constants import CryptoAlgorithm
from xrpl.models.transactions import Payment
from xrpl.utils import xrp_to_drops
from xrpl.core import addresscodec
from xrpl.transaction import submit_and_wait
from xrpl.models.requests.account_info import AccountInfo
from xrpl.models.requests import AccountNFTs
from xrpl.models.transactions import NFTokenMint
import json
from xrpl import *
import xrpl
import xrpl.wallet
from .models import NFT_address
from xrpl.models.requests.account_info import AccountInfo



####   CONNECT TO CLIENT   ####
JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
client = JsonRpcClient(JSON_RPC_URL)

# This file contains the functions which will be used for the Ripple hackathon
# Define the network clientfrom xrpl.clients


# client = AsyncJsonRpcClient("https://s.altnet.rippletest.net:51234")
# JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"

# Generate a charity or user wallet starting from a seed (private key)

def generateWalletFromSeed(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet

####   PAYMENT FUNCTION  ###
def pay_and_submit(sender_wallet,amount,destination):
    return submit_and_wait(Payment(account=sender_wallet.address, amount=xrp_to_drops(amount),destination=destination,), client, sender_wallet)


#### NFT FUNCTIONS ####
#
def mint_token(wallet,uri,taxon=0):
    mint_wallet=wallet
    mint_tx=NFTokenMint(
        account=mint_wallet.classic_address,
        uri=uri,
        nftoken_taxon=int(taxon),
    )
    signed_tx = xrpl.transaction.autofill_and_sign(
        mint_tx,
        client,
        mint_wallet
    )
    reply=""
    try:
        response=xrpl.transaction.submit_and_wait(signed_tx,client,mint_wallet)
        reply=response.result
        print("Account: ", reply['Account'])
        print("Nft minted id: ", reply['meta']['nftoken_id'])

        nft_address = NFT_address(
            address=reply['Account'],
            nftId=reply['meta']['nftoken_id']
        )
        nft_address.save()

    except xrpl.transaction.XRPLReliableSubmissionException as e:
        reply=f"Submit failed: {e}"
    return reply

def get_tokens(account):
    """get_tokens"""
    acct_nfts=AccountNFTs(
        account=account
    )
    response=client.request(acct_nfts)
    return response.result

def get_tokens_id(account, id):
    """get_tokens"""
    acct_nfts=AccountNFTs(
        account=account
    )
    response=client.request(acct_nfts)
    #print(response)
    nftokens = response.result['account_nfts']
    #print(nftokens)
    for nftoken in nftokens:
        if nftoken['NFTokenID'] == id:
            return nftoken
    return None


def burn_token(wallet,nftoken_id):
    """burn_token"""
    owner_wallet=wallet
    burn_tx=xrpl.models.transactions.NFTokenBurn(
        account=owner_wallet.address,
        nftoken_id=nftoken_id
    )
    signed_tx=xrpl.transaction.autofill_and_sign(
        burn_tx,client, owner_wallet)
    reply=""
    try:
        response=xrpl.transaction.submit_and_wait(signed_tx,client,owner_wallet)
        reply=response.result
    except xrpl.transaction.XRPLReliableSubmissionException as e:
        reply=f"Submit failed: {e}"
    return reply

def get_account_info(account):
    acct_info = AccountInfo(
        account=account,
        ledger_index="validated",
        strict=True,
    )
    response = client.request(acct_info)
    result = response.result
    print("response.status: ", response.status)
    import json
    #print(json.dumps(response.result, indent=4, sort_keys=True))
    return response.result["account_data"]["Balance"]


