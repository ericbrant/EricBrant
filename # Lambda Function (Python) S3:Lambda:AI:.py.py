# Lambda Function (Python) Example:
import boto3

s3 = boto3.client('s3')
comprehend = boto3.client('comprehend')

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    response = s3.get_object(Bucket=bucket, Key=key)
    text = response['Body'].read().decode('utf-8')
    
    sentiment = comprehend.detect_sentiment(Text=text, LanguageCode='en')
    
    output_key = 'analysis/' + key.replace('.txt', '_sentiment.json')
    s3.put_object(Bucket=bucket, Key=output_key, Body=str(sentiment), ContentType='application/json')
    
    return {
        'statusCode': 200,
        'body': f'Sentiment analysis saved as {output_key}'
    }
