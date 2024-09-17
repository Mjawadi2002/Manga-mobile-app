from django.db import models

# Create your models here.
class Article(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField()
    image = models.FileField(upload_to="article_images/") 