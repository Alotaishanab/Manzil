import boto3
from django.conf import settings
import os


def upload_to_s3(file, file_name, folder):
    s3 = boto3.client('s3')
    bucket_name = settings.AWS_STORAGE_BUCKET_NAME

    print('bucket_name', bucket_name)
    print('file_name', file_name)

    # File path in S3
    s3_file_path = f"{folder}/{file_name}"

    try:
        s3.upload_fileobj(file, bucket_name, s3_file_path)
        s3_url = f"https://{bucket_name}.s3.amazonaws.com/{s3_file_path}"
        return s3_url
    except Exception as e:
        print(f"Failed to upload {file_name} to S3: {e}")
        return None
