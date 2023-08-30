
from xrpl.asyncio.clients import AsyncJsonRpcClient
from xrpl.asyncio.account import get_account_root
from xrpl.asyncio.transaction import submit_and_wait
from xrpl.models.transactions import AccountSet
from xrpl.models import Payment
from xrpl.utils import xrp_to_drops

client = AsyncJsonRpcClient("https://s.altnet.rippletest.net:51234")

async def get_domain(charity_wallet):
    account_root = await get_account_root(charity_wallet.classic_address,client)
    remaining_amount = int(account_root['Domain'])
    return remaining_amount

async def update_domain(charity_wallet, new_tx_amount):
    remaining_amount = await submit_and_wait(domain_tx, client, charity_wallet)
    domain_tx = AccountSet(account=charity_wallet.classic_address, domain = str(remaining_amount - new_tx_amount))
    response = await submit_and_wait(domain_tx, client, charity_wallet)
    return response

async def transfer_from_charity(charity_wallet, destination_wallet, xrp_amount):
    payment_tx = Payment(account=charity_wallet.classic_address, destination=destination_wallet.classic_address, amount=xrp_to_drops(xrp_amount))
    response = await submit_and_wait(payment_tx, client, charity_wallet)
    return response

async def zero_amount(charity_wallet, destination_wallet, xrp_amount):
    transfer_from_charity(charity_wallet, destination_wallet, xrp_amount)
    burn_nft()
    return True

async def transfer_to_charity(donor_wallet, charity_wallet, xrp_amount):
    payment_tx = Payment(account=donor_wallet.classic_address, destination=charity_wallet.classic_address, amount=xrp_to_drops(xrp_amount))
    response_payment = await submit_and_wait(payment_tx, client, donor_wallet)
    response_domain = await update_domain(charity_wallet, xrp_amount)
    if get_domain(charity_wallet) == 0:
        zero_amount()
    return response_payment, response_domain