from dotenv import load_dotenv

load_dotenv()

import cloudinary
from cloudinary import CloudinaryImage
import cloudinary.uploader
import cloudinary.api

import json

config = cloudinary.config(secure=True)

# print("****1. Set up and configure the SDK:****\nCredentials: ", config.cloud_name, config.api_key, "\n")

# Specify the folder
folder = "restaurant-reservation-system/restaurants/heros"

# Get list of assets in the folder
result = cloudinary.api.resources(type="upload", prefix=folder, max_results=500)

# print(result)

# Iterate through assets and rename
for asset in result['resources']:
    old_public_id = asset['public_id']
    # Create new name based on your desired format
    first = '/'.join(old_public_id.split('/')[:-1])
    second = '_'.join(old_public_id.split('/')[-1].split('_')[:-1])
    # print(second)
    # second = '_'.join(old_public_id.split('/')[-1].split('_')[1])
    new_public_id = f"{first}/{second}"  # Example format

    # print(old_public_id)
    # print(new_public_id)

    # Rename the asset
    cloudinary.uploader.rename(old_public_id, new_public_id)

print("Batch rename completed.")

