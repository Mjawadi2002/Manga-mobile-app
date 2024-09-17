from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Article
from .serializers import ArticleSerializer

@api_view(['POST'])
def add_article(request):
    if request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_article(request):
    if request.method == 'POST':
        article_id = request.data.get('id')
        try:
            article = Article.objects.get(id=article_id)
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Article.DoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def edit_article(request):
    if request.method == 'POST':
        article_id = request.data.get('id')
        try:
            article = Article.objects.get(id=article_id)
            serializer = ArticleSerializer(article, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Article.DoesNotExist:
            return Response({'error': 'Article not found'}, status=status.HTTP_404_NOT_FOUND)

