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

####   CONNECT TO CLIENT   ####
JSON_RPC_URL = "https://s.altnet.rippletest.net:51234/"
client = JsonRpcClient(JSON_RPC_URL)


####   PAYMENT FUNCTION  ###
def pay_and_submit(sender_wallet,drops,destination):
    return submit_and_wait(Payment(account=sender_wallet.address, amount=xrp_to_drops(drops),destination=destination,), client, sender_wallet)


#### NFT FUNCTIONS ####
def mint_token(wallet,uri,taxon):
    mint_wallet=wallet
    mint_tx=NFTokenMint(
        account=mint_wallet.classic_address,
        uri=xrpl.utils.str_to_hex(uri),
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



