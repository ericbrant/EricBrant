# Lambda Function (Python) Example:
import boto3
from PIL import Image
import io

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    response = s3.get_object(Bucket=bucket, Key=key)
    image_content = response['Body'].read()
    
    img = Image.open(io.BytesIO(image_content))
    img_resized = img.resize((300, 300))
    
    buffer = io.BytesIO()
    img_resized.save(buffer, 'JPEG')
    buffer.seek(0)
    
    resized_key = 'resized/' + key
    s3.put_object(Bucket=bucket, Key=resized_key, Body=buffer, ContentType='image/jpeg')
    
    return {
        'statusCode': 200,
        'body': f'Image resized and saved as {resized_key}'
    }
